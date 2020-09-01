import os
from dotenv import load_dotenv
load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
    PROPAGATE_EXCEPTIONS = True
    ELASTICSEARCH_URL = os.environ.get('ELASTICSEARCH_URL')

    # S3 Config
    ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png']
    FILE_CONTENT_TYPES = {
        # these will be used to set the content type of S3 object. It is binary by default.
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png'
    }
    AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
    BUCKET_NAME = os.environ.get('BUCKET_NAME')

