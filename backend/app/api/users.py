from flask import jsonify, request, url_for, g, abort

from app import db
from app.api import bp
from app.models import User, Listing, Review, ListingSleepArgm
from app.api.auth import token_auth
from app.api.errors import bad_request, error_response


@bp.route('/users', methods=['GET'])
@token_auth.login_required
def get_users():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = User.to_collection_dict(User.query, page, per_page, 'api.get_users')
    return jsonify(data)


@bp.route('/users/<int:id>', methods=["GET"])
@token_auth.login_required
def get_user(id):
    return jsonify(User.query.get_or_404(id).to_dict())


@bp.route('/users/<int:id>/listings', methods=['GET'])
@token_auth.login_required
def get_listings_by_user(id):
    user = User.query.get_or_404(id)
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = Listing.to_collection_dict(user.listings, page, per_page,
                                      'api.get_listings_by_user', id=id)
    return jsonify(data)


@bp.route('/users/<int:id>/reviews', methods=['GET'])
@token_auth.login_required
def get_reviews_by_user(id):
    user = User.query.get_or_404(id)
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = Review.to_collection_dict(user.reviews, page, per_page,
                                     'api.get_reviews_by_user', id=id)
    return jsonify(data)


#A @bp.route('/users/<int:id>/wishlists', methods=['GET'])
#A @token_auth.login_required
# A def get_wishlists(id):
# A     user = User.query.get_or_404(id)
# A     data =
# A     return jsontify(data)


@bp.route('/users', methods=['POST'])
def create_user():
    # Request Validation
    data = request.get_json() or {}
    # print(data)
    # if 'username' not in data or 'email' not in data or 'password' not in data:
    #    return bad_request('Must include username, email and password fields')
    if 'email' not in data or 'password' not in data:
        return bad_request('Must include email field')
    if 'password' not in data:
        return bad_request('Must include password field')
    # if User.query.filter_by(username=data['username']).first():
    #    return bad_request('please use a different username')
    if User.query.filter_by(email=data['email']).first():
        return bad_request('please use a different email address')
    # Create user from request and submit
    user = User()
    user.from_dict(data, new_user=True)
    db.session.add(user)
    db.session.commit()
    # Create return value for request
    response = jsonify(user.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for('api.get_user', id=user.id)
    return response


@bp.route('/users/<int:id>', methods=['PUT'])
@token_auth.login_required
def update_user(id):
    # Prevent user from changing other user info
    if g.current_user.id != id:
        abort(403)
    user = User.query.get_or_404(id)
    data = request.get_json() or {}
    # if 'username' in data and data['username'] != user.username and \
    #        User.query.filter_by(username=data['username']).first():
    #    return bad_request('Please use a different username')
    if 'email' in data and data['email'] != user.email and \
            User.query.filter_by(email=data['email']).first():
        return bad_request('please use a different email address')

    user.from_dict(data, new_user=False)
    db.session.commit()
    return jsonify(user.to_dict())


@bp.route('/users/<int:id>/listings', methods=['POST'])
@token_auth.login_required
def create_listing_by_user(id):
    # Request Validation
    if g.current_user.id != id:
        abort(403)
    data = request.get_json() or {}
    # print(data)
    # if 'name' not in data:
    #    return bad_request('Must include listing\'s name')
    # if User.query.filter_by(username=data['name']).first():
    #    return bad_request('please use a different username')
    # print(data)
    #print('space: ', data['spaces'], type(data['spaces']))
    listing = Listing()

    print(listing.id)
    listing.user_id = id
    listing.from_dict(data, new_listing=True)
    if 'spaces' in data:
        listing.spaces = str(data['spaces'])
    if 'amenities' in data:
        listing.amenities = str(data['amenities'])
    if 'house_rules' in data:
        listing.house_rules = str(data['house_rules'])
    if 'completed' in data:
        listing.completed = str(data['completed'])
    db.session.add(listing)
    db.session.commit()

    if 'sleeping_arrangements' in data:
        # print(data['sleeping_arrangements'])
        for room_id, room in enumerate(data['sleeping_arrangements']):
            for type, number in room.items():
                _ = ListingSleepArgm()
                _.listing_id = listing.id
                _.argm_type = type
                _.number = number
                _.room_id = room_id
                db.session.add(_)
    db.session.commit()
    # Create return value for request
    response = jsonify(listing.to_dict())
    response.status_code = 201
    #response.headers['Location'] = url_for('api.get_listing', id=listing.id)
    return response


@bp.route('/users/<int:id>/listings/<int:l_id>', methods=['PUT'])
@token_auth.login_required
def update_listing(id, l_id):
    listing = Listing.query.get_or_404(l_id)
    if id != listing.host_id:
        return bad_request('Can not change listings of other hosts')
    data = request.get_json() or {}

    listing.user_id = id
    listing.from_dict(data, new_listing=True)
    # remove all old sleeping arrange...
    oldSleeps = ListingSleepArgm.query.filter_by(listing_id=l_id).all()
    if oldSleeps and len(oldSleeps) > 0:
        for sleep in oldSleeps:
            db.session.delete(sleep)
    if 'sleeping_arrangements' in data:
        print(data['sleeping_arrangements'])
        for room_id, room in enumerate(data['sleeping_arrangements']):
            for type, number in room.items():
                _ = ListingSleepArgm()
                _.listing_id = listing.id
                _.argm_type = type
                _.number = number
                _.room_id = room_id
                db.session.add(_)
    if 'spaces' in data:
        listing.spaces = str(data['spaces'])
    if 'amenities' in data:
        listing.amenities = str(data['amenities'])
    if 'house_rules' in data:
        listing.house_rules = str(data['house_rules'])
    if 'completed' in data:
        listing.completed = str(data['completed'])

    db.session.add(listing)
    db.session.commit()
    return jsonify(listing.to_dict())


@bp.route('/users/<int:id>/reviews', methods=['POST'])
@token_auth.login_required
def create_review_by_user(id):
    # Request Validation
    if g.current_user.id != id:
        abort(403)
    data = request.get_json() or {}
    # print(data)
    if 'listing_id' not in data:
        return bad_request('Must include listing\'s id')
    # query review of booking before add
    print('data', data)
    oldReview = Review.query.filter_by(
        reservation_id=data['reservation_id']).first()
    if oldReview:
        return error_response(202, 'You already reviewed this home!')
    # Create user from request and submit
    review = Review()
    review.user_id = id
    review.from_dict(data)
    db.session.add(review)
    db.session.commit()
    # Create return value for request
    response = jsonify(review.to_dict())
    response.status_code = 201
    return response


@bp.route('/users/reset_password_request/', methods=['POST'])
def reset_password_request():
    data = request.get_json() or {}
    if 'email' not in data:
        return bad_request('Must include email for password-reset-request request')
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return bad_request('Unknown email')
    token = user.get_reset_password_token()
    response = jsonify({'token': token})
    response.status_code = 201
    #response.headers['Location'] = url_for('api.reset_password_request')
    return response


@bp.route('/users/reset_password', methods=['PUT'])
def reset_password():
    data = request.get_json() or {}
    if 'token' not in data:
        return bad_request('Must include token for password-reset request')
    user = User.verify_reset_password_token(data['token'])
    if not user:
        return bad_request('User not found with current token')
    if 'new_password' not in data:
        return bad_request('Must include new password')
    else:
        user.set_password(data['new_password'])
        db.session.commit()
    return jsonify(user.to_dict())
