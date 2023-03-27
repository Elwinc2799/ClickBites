# Description: This file is the entry point for the backend application. It
# registers the blueprints for the business, review, and user routes and
# starts the Flask application.

from flask import Flask
from business.routes import business_bp
from review.routes import review_bp
from user.routes import user_bp

app = Flask(__name__)

app.register_blueprint(business_bp)
app.register_blueprint(review_bp)
app.register_blueprint(user_bp)

if __name__ == "__main__":
    app.run(debug=True)
