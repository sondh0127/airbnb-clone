import os

from flask import Flask, request, current_app
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
# ? from flask_mail import Mail

# ? from flask_bootstrap import Bootstrap
# ? from flask_moment import Moment
from flask_cors import CORS

from config import Config

from elasticsearch import Elasticsearch
# from boto.s3.connection import S3Connection
from boto.s3.key import Key as S3Key
import boto

db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()
login.login_view = 'auth.login'
login.login_message = ('Please log in to access this page.')

print('Config.AWS_ACCESS_KEY_ID', Config.AWS_ACCESS_KEY_ID)
print('Config.AWS_SECRET_ACCESS_KEY', Config.AWS_SECRET_ACCESS_KEY)
print('Config.BUCKET_NAME', Config.BUCKET_NAME)

# s3_conn = S3Connection(Config.AWS_ACCESS_KEY_ID, Config.AWS_SECRET_ACCESS_KEY)
# s3_bucket = s3_conn.get_bucket(Config.BUCKET_NAME)

s3_conn = boto.s3.connect_to_region('ap-southeast-1',
       aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
       aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY,
       is_secure=False,               # uncomment if you are not using ssl
       calling_format = boto.s3.connection.OrdinaryCallingFormat(),
       )
s3_bucket = s3_conn.get_bucket(Config.BUCKET_NAME)

s3_obj = S3Key(s3_bucket)


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)
    CORS(app)
    app.elasticsearch = Elasticsearch([app.config['ELASTICSEARCH_URL']]) \
        if app.config['ELASTICSEARCH_URL'] else None
    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)
    # ? from app.auth import bp as auth_bp
    # ? app.register_blueprint(auth_bp, url_prefix='/auth')
    # ? from app.main import bp as main_bp
    # ? app.register_blueprint(main_bp)
    from app.api import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api')
    # ? if not app.debug and not app.testing:

    return app
