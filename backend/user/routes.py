from flask import Blueprint, Response, request
from database import Database
import json

# Create a Flask blueprint for business related routes
user_bp = Blueprint("user", __name__)

# Get an instance of the database
db = Database.get_instance().get_db("user")

@user_bp.route("/user", methods=["GET"])
def get_user():
    try:
        # Query the database and convert the result to a list of User json objects
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
                    "message": "An error occurred while fetching the user data",
                }
            ),
            status=500,
            mimetype="application/json",
        )


@user_bp.route("/user", methods=["POST"])
def post_user():
    try:
        # post business object to database
        user = request.get_json()
        db.insert_one(user)

        # Return a JSON message with a 200 OK status code and JSON mimetype
        return Response(
            response=json.dumps(
                {
                    "message": "The user data was successfully posted to the database",
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
