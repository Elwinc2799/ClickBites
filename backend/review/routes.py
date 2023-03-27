from flask import Blueprint, Response, request
from database import Database
import json

# Create a Flask blueprint for business related routes
review_bp = Blueprint("review", __name__)

# Get an instance of the database
db = Database.get_instance().get_db("review")


@review_bp.route("/review", methods=["GET"])
def get_review():
    try:
        # Query the database and convert the result to a list of Review json objects
        documents = list(db.find())

        # Serialize the list of documents to a JSON string
        json_business = json.dumps(documents, default=str)

        # Return the JSON string with a 200 OK status code and JSON mimetype
        return Response(
            response=json_business,
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        # If an error occurred, return a JSON error message with a 500 Internal Server Error status code and JSON mimetype
        return Response(
            response=json.dumps(
                {
                    "message": "An error occurred while fetching the review data",
                }
            ),
            status=500,
            mimetype="application/json",
        )


@review_bp.route("/user", methods=["POST"])
def post_review():
    try:
        # post business object to database
        review = request.get_json()
        db.insert_one(review)

        # Return a JSON message with a 200 OK status code and JSON mimetype
        return Response(
            response=json.dumps(
                {
                    "message": "The review data was successfully posted to the database",
                }
            ),
            status=200,
            mimetype="application/json",
        )

    except Exception as e:
        # If an error occurred, return a JSON error message with a 500 Internal Server Error status code and JSON mimetype
        return Response(
            response=json.dumps(
                {
                    "message": "An error occurred while posting the data to the database",
                }
            ),
            status=500,
            mimetype="application/json",
        )
