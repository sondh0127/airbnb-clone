from flask import jsonify, request, url_for, g

from app import db
from app.api import bp
from app.models import Listing, Review, ListingDate, ListingSleepArgm, ListingImage
from app.api.auth import token_auth
from app.api.errors import bad_request, error_response
from datetime import datetime
import base64
import math

from app import s3_obj, s3_bucket


@bp.route('/listings', methods=['GET'])
def get_listings():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = Listing.to_collection_dict(
        Listing.query, page, per_page, 'api.get_listings')
    return jsonify(data)


def distance(p1, p2):
    def rad(x):
        return x * math.pi / 180
    R = 6378137
    dLat = rad(p2['lat'] - p1['lat'])
    dLong = rad(p2['lng'] - p1['lng'])
    a = math.sin(dLat / 2) * math.sin(dLat / 2) + \
        math.cos(rad(p1['lat'])) * math.cos(rad(p2['lat'])) * \
        math.sin(dLong / 2) * math.sin(dLong / 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    d = R * c
    return d


@bp.route('/listings/search', methods=['GET'])
def search_listings():
    checkIn = request.args.get('checkIn')
    checkOut = request.args.get('checkOut')
    guests = request.args.get('guests')
    children = request.args.get('children')
    infants = request.args.get('infants')
    price = request.args.get('price')
    shared_room = request.args.get('shared_room')
    private_room = request.args.get('private_room')
    entire_place = request.args.get('entire_place')
    result = Listing.query.filter_by(is_publish=True)
    if guests:
        guests = int(guests)
        result = result.filter(Listing.num_guests >= guests)
    if children:
        children = 'True' if children == 'true' else 'False'
        query = '\'children\': {}'.format(children)
        print('query', query)
        result = result.filter(Listing.house_rules.contains(query))
    if infants:
        infants = 'True' if infants == 'true' else 'False'
        query = '\'infants\': {}'.format(infants)
        result = result.filter(Listing.house_rules.contains(query))
    place_types = []
    if shared_room == '1':
        place_types.append('shared_room')
    if private_room == '1':
        place_types.append('private_room')
    if entire_place == '1':
        place_types.append('entire_place')
    print('place_types', place_types)
    if shared_room or private_room or entire_place:
        result = result.filter(Listing.room_type.in_(place_types))
    if checkIn and checkOut:
        checkIn = datetime.strptime(checkIn, '%d/%m/%Y')
        checkOut = datetime.strptime(checkOut, '%d/%m/%Y')
        listing_date = ListingDate.query.filter(
            ListingDate.date <= checkOut).filter(ListingDate.date >= checkIn).all()
        listing_ids = []
        for date in listing_date:
            listing_ids.append(date.listing_id)
        result = result.filter(Listing.id.notin_(listing_ids))
    if price:
        price_range = price.split('-')
        min_price = price_range[0]
        max_price = price_range[1]
        result = result.filter(
            Listing.price >= min_price, Listing.price <= max_price)
    # location
    lat = request.args.get('lat')
    lng = request.args.get('lng')
    if (lat and lng):
        center = {'lat': float(lat), 'lng': float(lng)}
        out_ids = []
        for listing in result.all():
            l_point = {'lat': listing.lat, 'lng': listing.lng}
            if distance(center, l_point) > 700:
                print('distance', distance(center, l_point))
                out_ids.append(listing.id)
        result = result.filter(Listing.id.notin_(out_ids))
    # response
    items = []
    for listing in result.all():
        items.append(listing.to_dict())
    return jsonify({'items': items})


@bp.route('/listings/<int:l_id>', methods=['GET'])
def get_listing(l_id):
    listing = Listing.query.filter_by(id=l_id, is_publish=True)
    return jsonify(Listing.query.get_or_404(l_id).to_dict())


@bp.route('/listings/<int:l_id>/general', methods=['GET'])
@token_auth.login_required
def get_listing_general(l_id):
    listing = Listing.query.get_or_404(l_id)
    return jsonify(listing.general_info())


@bp.route('/listings/<int:l_id>/reviews', methods=['GET'])
def get_reviews_of_listing(l_id):
    listing = Listing.query.get_or_404(l_id)
    # page = request.args.get('page', 1, type=int)
    # per_page = min(request.args.get('per_page', 10, type=int), 100)
    # data = Review.to_collection_dict(listing.reviews, page, per_page,
    #                                  'api.get_reviews_of_listing', l_id=l_id)
    reviews = Review.query.filter_by(listing_id=l_id).all()

    res = {
        'items': []
    }
    print(reviews)
    for review in reviews:
        if review:
            res['items'].append(review.to_dict())

    response = jsonify(res)
    response.status_code = 200
    return response


### Dates api ###
@bp.route('/listings/<int:l_id>/dates', methods=['GET'])
def get_dates_of_listing(l_id):
    listing = Listing.query.get_or_404(l_id)
    # page = request.args.get('page', 1, type=int)
    # per_page = min(request.args.get('per_page', 30, type=int), 100)
    dates = ListingDate.query.filter_by(listing_id=l_id).all()
    # data = ListingDate.to_collection_dict(listing.calendar, page, per_page,
    #                                       'api.get_dates_of_listing', l_id=l_id)
    response = {'items': []}
    for day in dates:
        response['items'].append(day.to_dict())
    return jsonify(response)


@bp.route('/listings/<int:l_id>/dates', methods=['POST'])
@token_auth.login_required
def add_dates_to_listing(l_id):
    listing = Listing.query.get_or_404(l_id)
    if g.current_user.id != listing.host_id:
        return bad_request('Can not change dates of listing from other hosts')
    data = request.get_json() or {}
    if 'dates' not in data:
        return bad_request('Must include new dates')
    responses = []
    # remove old dates
    blockedDays = ListingDate.query.filter_by(
        date_type='blocked', listing_id=l_id)
    for days in blockedDays:
        db.session.delete(days)
        db.session.commit()
    for date in data['dates']:
        _ = ListingDate()
        _.listing_id = l_id
        _.date_type = date['date_type']
        _.date = datetime.strptime(date['date'], '%d/%m/%Y')
        responses.append(_)
        db.session.add(_)
    db.session.commit()
    # page = request.args.get('page', 1, type=int)
    # per_page = min(request.args.get('per_page', 31, type=int), 100)
    # response = jsonify(ListingDate.to_collection_dict(responses, page, per_page,
    #                                                   'api.add_dates_to_listing', l_id=l_id))
    response = jsonify(data['dates'])
    response.status_code = 201
    return response


@bp.route('/listings/<int:l_id>/publish', methods=['PUT'])
@token_auth.login_required
def publish_listing(l_id):
    listing = Listing.query.get_or_404(l_id)
    if g.current_user.id != listing.host_id:
        return bad_request('Can not change dates of listing from other hosts')
    data = request.get_json() or {}
    if 'is_publish' not in data:
        return bad_request('Must publish status: {true, false}')
    listing.is_publish = data['is_publish']
    db.session.add(listing)
    db.session.commit()
    response = jsonify({
        "success": True,
        "message": listing.is_publish
    })
    response.status_code = 200
    return response


# @bp.route('/listings/<int:l_id>/dates', methods=['DELETE'])
# @token_auth.login_required
# def delete_dates_of_listing(l_id):
#     listing = Listing.query.get_or_404(l_id)
#     if g.current_user.id != listing.host_id:
#         return bad_request('Can not change dates of listing from other hosts')


@bp.route('/listings/<int:l_id>/sleep_argms', methods=['GET'])
def get_sleepargms_of_listing(l_id):
    # listing = Listing.query.get_or_404(l_id)
    data = {'items': []}
    query = ListingSleepArgm.query.filter_by(listing_id=l_id).all()
    # for i in listing.sleep_argms:
    rooms = set([i.room_id for i in query])
    # print(rooms)
    data = {'items': []}
    for room in rooms:
        _ = {}
        for i in query:
            if i.room_id == room:
                _[i.argm_type] = i.number
        data['items'].append(_)

    return jsonify(data)


@bp.route('/listings/<int:l_id>/sleep_argms', methods=['POST'])
@token_auth.login_required
def add_sleepargm_to_listing(l_id):
    listing = Listing.query.get_or_404(l_id)
    if g.current_user.id != listing.host_id:
        return bad_request('Can not change dates of listing from other hosts')
    data = request.get_json() or {}
    if 'sleep_argm' not in data:
        return bad_request('Must include new sleep arangement')
    _ = ListingSleepArgm()
    _.listing_id = l_id
    _.room_name = data['room_name']
    _.num_beds = data['num_beds']
    db.session.add(_)
    db.session.commit()
    response = jsonify(_.to_dict())
    response.status_code = 201
    return response


@bp.route("/listings/<int:l_id>/images", methods=['GET'])
def get_images_of_listing(l_id):
    listing = Listing.query.get_or_404(l_id)
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 30, type=int), 100)
    # data = ListingDate.query.filter_by(listing_id=l_id)
    data = ListingImage.to_collection_dict(listing.images, page, per_page,
                                           'api.get_images_of_listing', l_id=l_id)
    return jsonify(data)


@bp.route("/listings/<int:l_id>/images", methods=['POST'])
@token_auth.login_required
def uploadImage(l_id):
    data = request.get_json() or {}
    img = data['imgSrc']
    img_meta, img_str = img.split(',')
    # img_meta = data:image/png;base64
    content_type = img_meta[5:-7]
    # Add to S3
    date = str(datetime.utcnow())
    date_str = ''.join(c for c in date if c.isdigit())
    path = "images/" + \
        'listing/{}/'.format(l_id) + '{}.{}'.format(date_str, content_type[6:])
    s3_obj.key = path
    s3_obj.set_contents_from_string(base64.b64decode(img_str))
    s3_obj.set_metadata('Content-Type', content_type)
    s3_obj.set_acl('public-read')

    img_url = s3_obj.generate_url(3600).split('?')[0].replace(':443', '')
    response = jsonify({'url': img_url})
    response.status_code = 200

    # Add to db
    _ = ListingImage()
    _.listing_id = l_id
    _.img_url = img_url
    db.session.add(_)
    db.session.commit()

    return response


@bp.route("/listings/<int:l_id>/images", methods=['PUT'])
@token_auth.login_required
def add_image_label(l_id):
    listing = Listing.query.get_or_404(l_id)
    if g.current_user.id != listing.host_id:
        return bad_request('Can not change dates of listing from other hosts')
    data = request.get_json() or {}
    url = data['url']
    caption = data['caption']
    listingImage = ListingImage.query.filter_by(img_url=url).first()
    if listingImage:
        listingImage.img_caption = caption
        db.session.add(listingImage)
        db.session.commit()
        response = jsonify(listingImage.to_dict())
        response.status_code = 200
        return response

    return error_response(203, "Not found image to update")


@bp.route("/listings/<int:l_id>/images", methods=['DELETE'])
@token_auth.login_required
def delete_image_of_listing(l_id):
    listing = Listing.query.get_or_404(l_id)
    if g.current_user.id != listing.host_id:
        return bad_request('Can not change dates of listing from other hosts')
    data = request.get_json() or {}
    print('data', data)
    url = data['url']
    # Delete on S3
    path = url.split('.com')[1]
    obj = s3_bucket.get_key(path)
    obj.delete()
    # Delete on db
    image = ListingImage.query.filter_by(img_url=url).first()
    if image:
        db.session.delete(image)
        db.session.commit()

    return '', 204


# @bp.route('/listings/<int:l_id>/sleep_argms', methods=['DELETE'])

"""
@bp.route('/dates/listings/<int:l_id>/price', methods=['PUT'])
def update_dates_price(l_id):
    listing = Listing.query.get_or_404(l_id)
    data = request.get_json() or {}
    if 'date' not in data:
        return bad_request('No Date specified')
    elif 'price' not in data:
        return bad_request('Must include price for the date')
    else:
        date = Listing.dates.filter_by(date=data['date']).first()
        setattr(date, price, data['price'])
        db.session.commit()
    return jsonify(date.to_dict())


@bp.route('/dates/listings/<int:l_id>/availability', methods=['PUT'])
def update_date_availability(l_id):
    listing = Listing.query.get_or_404(l_id)
    data = request.get_json() or {}
    if 'date' not in data:
        return bad_request('No Date specified')
    elif 'availability' not in data:
        return bad_request('No availability specified')
    else:
        date = Listing.dates.filter_by(date=data['date']).first()
        setattr(date, availability, data['availability'])
        db.session.commit()
    return jsonify(date.to_dict())
"""
