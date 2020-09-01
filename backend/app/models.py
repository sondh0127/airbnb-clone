import base64
import os
import jwt
# ? import json
import enum

from time import time
from datetime import datetime, timedelta

# ? from hashlib import md5

from flask import url_for, current_app
from flask_login import UserMixin

from app import db, login
from app.search import add_to_index, remove_from_index, query_index

from werkzeug.security import generate_password_hash, check_password_hash
# import sqlalchemy_utils
# from sqlalchemy_utils.types.choice import ChoiceType


class SearchableMixin(object):
    # This class is inherited by Model classes
    # All methods are class method
    #! self is rename to cls, represent Model cls

    @classmethod
    def search(cls, expression, page, per_page):
        """
        expression: query
        """
        ids, total = query_index(cls.__tablename__, expression, page, per_page)
        #  all indexes will be named with the name
        # Flask-SQLAlchemy assigned to the relational table
        if total == 0:
            return cls.query.filter_by(id=0), 0
        when = []
        for i in range(len(ids)):
            when.append((ids[i], i))
        return cls.query.filter(cls.id.in_(ids)).order_by(
            db.case(when, value=cls.id)), total

    @classmethod
    def before_commit(cls, session):
        session._changes = {
            'add': list(session.new),
            'update': list(session.dirty),
            'delete': list(session.deleted)
        }

    @classmethod
    def after_commit(cls, session):
        for obj in session._changes['add']:
            if isinstance(obj, SearchableMixin):
                add_to_index(obj.__tablename__, obj)
        for obj in session._changes['update']:
            if isinstance(obj, SearchableMixin):
                add_to_index(obj.__tablename__, obj)
        for obj in session._changes['delete']:
            if isinstance(obj, SearchableMixin):
                remove_from_index(obj.__tablename__, obj)
        session._changes = None

    @classmethod
    def reindex(cls):
        """ Add all instances in db to search index """
        for obj in cls.query:
            add_to_index(cls.__tablename__, obj)


db.event.listen(db.session, 'before_commit', SearchableMixin.before_commit)
db.event.listen(db.session, 'after_commit', SearchableMixin.after_commit)


class PaginatedAPIMixin(object):
    @staticmethod
    def to_collection_dict(query, page, per_page, endpoint, **kwargs):
        resources = query.paginate(page, per_page, False)
        data = {
            'items': [item.to_dict() for item in resources.items],
            '_meta': {
                'page': page,
                'per_page': per_page,
                'total_pages': resources.pages,
                'total_items': resources.total
            },
            '_links': {
                'self': url_for(endpoint, page=page, per_page=per_page,
                                **kwargs),
                'next': url_for(endpoint, page=page + 1, per_page=per_page,
                                **kwargs) if resources.has_next else None,
                'prev': url_for(endpoint, page=page - 1, per_page=per_page,
                                **kwargs) if resources.has_prev else None
            }
        }
        return data

# wishlists = db.Table(
#     'wishlists',
#     db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
#     db.Column('listing_id', db.Integer, db.ForeignKey('listing.id'))
# )


class User(UserMixin, PaginatedAPIMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    firstname = db.Column(db.String(120), index=True)
    lastname = db.Column(db.String(120), index=True)
    birthday = db.Column(db.DateTime)

    # Auth-related
    token = db.Column(db.String(32), index=True, unique=True)
    token_expiration = db.Column(db.DateTime)

    listings = db.relationship(
        'Listing', backref='host', lazy='dynamic')
    reviews = db.relationship(
        'Review', backref='reviewer', lazy='dynamic')
    reservations = db.relationship(
        'Reservation', backref='reserver', lazy='dynamic')
    # wishlists = db.relationship(
    #     'Listing', secondary=wishlists,
    #     primaryjoin=(wishlists.c.listing_id == id),
    #     secondaryjoin=(wishlists.c.user_id == id),
    #     backref=db.backref('wishlists', lazy='dynamic'),
    #     lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(' '.join([self.firstname, self.lastname]))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_reset_password_token(self, expires_in=600):
        return jwt.encode(
            {'reset_password': self.id, 'exp': time() + expires_in},
            current_app.config['SECRET_KEY'],
            algorithm='HS256').decode('utf-8')

    @staticmethod
    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, current_app.config['SECRET_KEY'],
                            algorithms=['HS256'])['reset_password']
        except:
            return
        return User.query.get(id)

    def to_dict(self, include_email=False):
        data = {
            'id': self.id,
            # 'username': self.username,
            'email': self.email,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'birthday': self.birthday,
            '_links': {
                'self': url_for('api.get_user', id=self.id),
                'listings': url_for('api.get_listings_by_user', id=self.id),
                'reviews': url_for('api.get_reviews_by_user', id=self.id),
                'reservations': url_for('api.get_reservations_of_user', u_id=self.id)
                # 'wishlists': url_for('api.get_wishlists', id=self.id),
            }
        }
        if include_email:
            data['email'] = self.email
        return data

    def from_dict(self, data, new_user=False):
        for field in ['email', 'firstname', 'lastname', 'birthday']:
            if field == 'birthday':
                self.birthday = datetime.strptime(data[field], "%d/%m/%Y")
            elif field in data:
                setattr(self, field, data[field])
        if new_user and 'password' in data:
            self.set_password(data['password'])

    def get_token(self, expires_in=3600):
        now = datetime.utcnow()
        if self.token and self.token_expiration > now + timedelta(seconds=60):
            return self.token

        self.token = base64.b64encode(os.urandom(24)).decode('utf-8')
        self.token_expiration = now + timedelta(seconds=expires_in)
        db.session.add(self)
        return self.token

    def revoke_token(self):
        self.token_expiration = datetime.utcnow() - timedelta(seconds=1)

    @staticmethod
    def check_token(token):
        user = User.query.filter_by(token=token).first()
        print('[CHECK TOKEN]: {}'.format(user.id))
        if user is None or user.token_expiration < datetime.utcnow():
            return None
        return user
    # ? def get_reset_password_token(self, expires_in=600):
    # ? def verify_reset_password_token(token):


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


class RoomType(enum.Enum):
    entire_place = 'entire_place'
    private_room = 'private_room'
    shared_room = 'shared_room'


class Listing(SearchableMixin, PaginatedAPIMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    host_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    listing_title = db.Column(db.String(120), index=True)
    # room_type = db.Column(ChoiceType(RoomType, impl=db.Integer()), index=True)
    room_type = db.Column(db.Enum('entire_place', 'private_room',
                                  'shared_room', name='room_type'), default='private_room')
    num_guests = db.Column(db.Integer, index=True)
    num_bedrooms = db.Column(db.Integer, index=True)
    num_beds = db.Column(db.Integer, index=True)
    num_bathrooms = db.Column(db.Integer, index=True)
    price = db.Column(db.Float)
    min_nights = db.Column(db.Integer)
    max_nights = db.Column(db.Integer)
    summary = db.Column(db.String(500))
    the_space = db.Column(db.Text)
    the_availability = db.Column(db.Text)
    neighborhood = db.Column(db.Text)
    the_getting_around = db.Column(db.Text)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    city = db.Column(db.String(30), index=True)
    street = db.Column(db.String(140), index=True)
    country = db.Column(db.String(30), index=True)
    state = db.Column(db.String(30), index=True)
    zip_code = db.Column(db.String(10))

    spaces = db.Column(db.String(500))
    amenities = db.Column(db.String(500))
    house_rules = db.Column(db.String(500))

    is_publish = db.Column(db.Boolean, default=False, nullable=False)
    completed = db.Column(db.String(100))

    reviews = db.relationship(
        'Review', backref='target_listing', lazy='dynamic')
    calendar = db.relationship(
        'ListingDate', backref='target_listing', lazy='dynamic')
    sleep_argms = db.relationship(
        'ListingSleepArgm', backref='target_listing', lazy='dynamic')
    images = db.relationship(
        'ListingImage', backref='target_listing', lazy='dynamic')
    reservations = db.relationship(
        'Reservation', backref='target_listing', lazy='dynamic')

    def __repr__(self):
        return '<Listing {}>'.format(self.listing_title)

    def to_dict(self):
        data = {
            'id': self.id,
            'host_id': self.host_id,
            'listing_title': self.listing_title,
            'room_type': self.room_type,
            'num_guests': self.num_guests,
            'num_bedrooms': self.num_bedrooms,
            'num_beds': self.num_beds,
            'num_bathrooms': self.num_bathrooms,
            'price': self.price,
            'min_nights': self.min_nights,
            'max_nights': self.max_nights,
            'summary': self.summary,
            'the_space': self.the_space,
            'neighborhood': self.neighborhood,
            'the_getting_around': self.the_getting_around,
            'the_availability': self.the_availability,
            'lat': self.lat,
            'lng': self.lng,
            'city': self.city,
            'street': self.street,
            'country': self.country,
            'state': self.state,
            'zip_code': self.zip_code,
            'spaces': eval(self.spaces),
            'amenities': eval(self.amenities),
            'house_rules': eval(self.house_rules),
            'is_publish': self.is_publish,
            'completed': eval(self.completed),

            '_links': {
                'self': url_for('api.get_listing', l_id=self.id),
                'host': url_for('api.get_user', id=self.host_id),
                'reviews': url_for('api.get_reviews_by_user', id=self.id),
                'calendar': url_for('api.get_dates_of_listing', l_id=self.id)
            }
        }
        return data

    def from_dict(self, data, new_listing=True):
        for field in ['host_id', 'listing_title', 'room_type', 'num_guests', 'num_bedrooms', 'num_beds',
                      'num_bathrooms', 'price', 'min_nights', 'max_nights', 'summary', 'the_space',
                      'neighborhood', 'the_getting_around', 'the_availability',
                      'city', 'street', 'country', 'state', 'zip_code', 'is_publish']:
            if field in data:
                setattr(self, field, data[field])
        # self.lat = data['center']['lat']
        # self.lng = data['center']['lng']
        setattr(self, 'lat', data['center']['lat'])
        setattr(self, 'lng', data['center']['lng'])

    def general_info(self):
        listing = self.to_dict()
        listingPhotos = ListingImage.query.filter_by(listing_id=self.id).all()
        listing['photos'] = []
        for photo in listingPhotos:
            listing['photos'].append(photo.to_dict())
        reviews = Review.query.filter_by(listing_id=self.id).all()
        general_data = {
            'listing': listing,
            'reviews': []
        }
        for review in reviews:
            if review:
                general_data['reviews'].append(review.to_dict())
        return general_data


class ListingImage(SearchableMixin, PaginatedAPIMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(db.String(255), index=True, unique=True)
    img_caption = db.Column(db.String(100))
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'))

    def __repr__(self):
        return '<Listing Image {}>'.format(self.img_caption)

    def to_dict(self):
        data = {
            'url': self.img_url,
            'caption': self.img_caption
        }
        return data


class ListingSleepArgm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'))
    argm_type = db.Column(db.String(30), index=True)
    number = db.Column(db.Integer, index=True, default=0)
    room_id = db.Column(db.Integer, index=True)

# class DateType(enum.Enum):
#    blocked = 1
#    reserved = 2


class ListingDate(SearchableMixin, PaginatedAPIMixin, db.Model):
    # Blocked calendar which are the days user cannot book
    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'))
    date = db.Column(db.DateTime, default=datetime.utcnow)
    date_type = db.Column(db.Enum('blocked', 'reserved',
                                  name='date_type'), default='blocked')

    def to_dict(self):
        data = {
            'date': self.date.strftime('%d/%m/%Y'),
            'date_type': self.date_type
        }
        return data

    def from_dict(self, data):
        self.date = data['date']

# class Booking(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'))
#     #A checkin_date = db.Column(db.Datetime, default=datetime.utcnow)
#     #A checkout_date = db.Column(db.Datetime, default=datetime.utcnow)
#     #A num_children = db.Column(db.Integer, default=0)
#     #A num_adults = db.Column(db.Integer, default=1)
#     #A book_price = db.Column(db.Float)
#
#     def __repr__(self):
#         return '<Booking {}'.format(self.id)
#
#     def to_dict(self):
#         data = {
#             'id': self.id,
#             'user_id': self.user_id,
#             'listing_id': self.listing_id
#         }
#         return data
#
#     @staticmethod
#     def to_collection_dict(query):
#         return {'items': [q.to_dict() for q in query]}
#     #? def get_price(self):


class Reservation(SearchableMixin, PaginatedAPIMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'))
    check_in_date = db.Column(db.DateTime, index=True)
    check_out_date = db.Column(
        db.DateTime, index=True)
    num_guests = db.Column(db.Integer)
    adults_num = db.Column(db.Integer)
    children_num = db.Column(db.Integer)
    infants_num = db.Column(db.Integer)
    total_cost = db.Column(db.Float)

    def __repr__(self):
        return '<Reservation {}'.format(self.id)

    def to_dict(self):
        data = {
            'id': self.id,
            'userId': self.user_id,
            'listingId': self.listing_id,
            'checkIn': self.check_in_date,
            'checkOut': self.check_out_date,
            'guests': self.num_guests,
            'adultsNum': self.adults_num,
            'childrenNum': self.children_num,
            'infantsNum': self.infants_num,
            'totalCost': self.total_cost
        }
        return data

    def from_dict(self, data):
        self.user_id = data['user_id']
        self.listing_id = data['listingId']
        self.check_in_date = datetime.strptime(data['checkIn'], '%d/%m/%Y')
        self.check_out_date = datetime.strptime(data['checkOut'], '%d/%m/%Y')
        self.total_cost = data['totalCost']
        self.num_guests = data['guests']
        self.adults_num = data['adultsNum']
        self.children_num = data['childrenNum']
        self.infants_num = data['infantsNum']
        self.total_cost = data['totalCost']


class Review(SearchableMixin, PaginatedAPIMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), index=True)
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'), index=True)
    reservation_id = db.Column(
        db.Integer, db.ForeignKey('reservation.id'), index=True)
    body = db.Column(db.Text)
    ratings = db.Column(db.String(256))
    review_date = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __repr__(self):
        return '<Review {}>'.format(self.ratings)

    def to_dict(self):
        data = {
            'id': self.id,
            'user_id': self.user_id,
            'listing_id': self.listing_id,
            'reservation_id': self.reservation_id,
            'body': self.body,
            'ratings': eval(self.ratings),
            'review_date': self.review_date.strftime('%d/%m/%Y')
        }
        return data

    def from_dict(self, data):
        self.listing_id = data['listing_id']
        self.reservation_id = data['reservation_id']
        self.body = data['body']
        self.ratings = str(data['ratings'])
        return data
