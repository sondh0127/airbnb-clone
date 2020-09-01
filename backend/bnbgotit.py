from app import create_app, db
from app.models import User, Listing, Review, ListingImage, Reservation

app = create_app()


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Listing': Listing,
            'Review': Review, 'Reservation': Reservation,
            'ListingImage': ListingImage}


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=False, threaded=True)
