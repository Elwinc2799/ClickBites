# create a flask backend which connects to a mongodb database
# and returns the data in json format

from flask import Flask
from business.routes import business_bp
# from review.routes import review_bp
# from user.routes import user_bp

app = Flask(__name__)

app.register_blueprint(business_bp)
# app.register_blueprint(review_bp)
# app.register_blueprint(user_bp)

if __name__ == "__main__":
    app.run(debug=True)
