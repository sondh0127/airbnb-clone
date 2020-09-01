from flask import jsonify, request, url_for, g
from sqlalchemy import desc
from app import db
from app.api import bp
from app.models import Reservation, User, Listing, ListingDate
from app.api.auth import token_auth
from app.api.errors import bad_request, error_response
from datetime import datetime, timedelta


@bp.route('/reservations/<int:r_id>', methods=['GET'])
@token_auth.login_required
def get_reservation(r_id):
    return jsonify(Reservation.query.get_or_404(id).to_dict())


@bp.route('/reservations/users/<int:u_id>', methods=['GET'])
@token_auth.login_required
def get_reservations_of_user(u_id):
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    user = User.query.get_or_404(u_id)
    data = Reservation.to_collection_dict(user.reservations, page, per_page,
                                          'api.get_reservations_of_user', u_id=u_id)
    return jsonify(data)


@bp.route('/reservations/listings/<int:l_id>', methods=['GET'])
@token_auth.login_required
def get_reservations_for_listing(l_id):
    userId = request.args.get('userId')
    listing = Listing.query.get_or_404(l_id)
    if not userId:
        return bad_request('Must include user ID')
    reservation = Reservation.query.filter_by(
        listing_id=l_id).filter_by(user_id=userId).order_by(Reservation.check_out_date.desc()).first()
    if reservation:
        return jsonify(reservation.to_dict())
    else:
        return error_response(204, "")


@bp.route('/reservations', methods=['POST'])
@token_auth.login_required
def create_reservation():
    data = request.get_json() or {}
    u_id = g.current_user.id
    if 'listingId' not in data:
        return bad_request('Must include listing ID')
    data['user_id'] = u_id
    reservation = Reservation()
    reservation.from_dict(data)
    db.session.add(reservation)

    # block the date
    check_in_date = reservation.check_in_date
    check_out_date = reservation.check_out_date
    # check not continuously dates
    listingDates = ListingDate.query.filter_by(
        listing_id=reservation.listing_id).filter(
        ListingDate.date <= check_out_date).filter(ListingDate.date >= check_in_date).all()
    if len(listingDates) > 0:
        return error_response(202, 'Please choose a continuous dates range')
    # serve the date
    date_generated = [
        check_in_date + timedelta(days=x) for x in range(0, (check_out_date-check_in_date).days + 1)]
    for gen_d in date_generated:
        print(gen_d.strftime('%d/%m/%Y'))
        listingDate = ListingDate()
        listingDate.listing_id = data['listingId']
        listingDate.date = gen_d
        listingDate.date_type = 'reserved'
        db.session.add(listingDate)

    db.session.commit()
    response = jsonify(reservation.to_dict())
    response.status_code = 201
    return response


@bp.route('/reservations/<int:r_id>', methods=['PUT'])
@token_auth.login_required
def update_reservation(r_id):
    reservation = Reservation.query.get_or_404(r_id)
    u_id = reservation.user_id
    if g.current_user.id != u_id:
        return bad_request('Can not change other reservations')
    data = request.get_json() or {}
    # if ....
    reservation.from_dict(data)
    db.session.commit()
    return jsonify(reservation.to_dict())


@bp.route('/reservations/<int:r_id>', methods=['DELETE'])
@token_auth.login_required
def delete_reservation(r_id):
    reservation = Reservation.query.get_or_404(r_id)
    u_id = reservation.user_id
    if g.current_user.id != u_id:
        return bad_request('Can not delete other reservations')

    check_in_date = reservation.check_in_date
    check_out_date = reservation.check_out_date
    listingDates = ListingDate.query.filter_by(
        listing_id=reservation.listing_id).filter(
        ListingDate.date <= check_out_date).filter(ListingDate.date >= check_in_date).all()
    for date in listingDates:
        db.session.delete(date)

    db.session.delete(reservation)
    db.session.commit()
    return '', 204
