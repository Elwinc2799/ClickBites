from flask import Blueprint, Response, session, request, current_app
from flask_jwt_extended import jwt_required
from database import Database
import json
from user.models import User
from bson.objectid import ObjectId
import jwt


# Create a Flask blueprint for user related routes
user_bp = Blueprint("user", __name__)

# Get an instance of the database
db = Database.get_instance().get_db("user")

# signup
@user_bp.route("/api/signup", methods=["POST"])
def signUp():
    try:
        # get user object from response form
        user = User().get()

        # TODO: Validate user input and create a new user in your database
        # ...

        # search for user in database
        document = db.find_one({"email": user.get("email")})

        # check if user exists
        if document is None:
            # post user object to database
            db.insert_one(user)

            # Return a JSON message with a 200 OK status code and JSON mimetype
            return Response(
                response=json.dumps({"message": "The user data was successfully posted to the database"}),
                status=200,
                mimetype="application/json",
            )
        else:
            return Response(
                response=json.dumps(
                    {
                        "message": "The user data was not posted to the database because it already exists",
                    }
                ),
                status=404,
                mimetype="application/json",
            )

    except Exception as e:
        # If an error occurred, return a JSON error message with a 500 Internal Server Error status code and JSON mimetype
        return Response(
            response=json.dumps(
                {
                    "message": "An error occurred while posting user data to the database",
                }
            ),
            status=500,
            mimetype="application/json",
        )


# login
@user_bp.route("/api/login", methods=["POST"])
def login():
    try:
        # get user object from response form
        user = User().get()

        # search for user in database
        user = db.find_one(user)

        # check if user exists
        if user is None:
            return Response(
                response=json.dumps(
                    {
                        "message": "The user data was not found in the database",
                    }
                ),
                status=404,
                mimetype="application/json",
            )
        else:
            token = jwt.encode({"sub": str(user["_id"])}, "super-secret-key", algorithm="HS256")

            # Return a JSON message with a 200 OK status code and JSON mimetype
            return Response(
                response=json.dumps(
                    {"message": "The user data was successfully validated with the database", "access_token": token}
                ),
                status=200,
                mimetype="application/json",
            )

    except Exception as e:
        # If an error occurred, return a JSON error message with a 500 Internal Server Error status code and JSON mimetype
        return Response(
            response=json.dumps(
                {
                    "message": "An error occurred while validating user data with the database",
                }
            ),
            status=500,
            mimetype="application/json",
        )


# retrieve user profile
@user_bp.route("/api/profile/<string:user_id>", methods=["GET"])
def retrieveProfile(user_id):
    try:
        # get user object from database
        document = db.find_one({"_id": ObjectId(user_id)})

        # check if user exists
        if document is None:
            # Serialize the retrieved document to a JSON string
            user = json.dumps(document, default=str)

            return Response(
                response=json.dumps(
                    {
                        "message": "The user data was not found in the database",
                    }
                ),
                status=404,
                mimetype="application/json",
            )
        else:

            # Return the JSON string with a 200 OK status code and JSON mimetype
            return Response(
                response=user,
                status=200,
                mimetype="application/json",
            )

    except Exception as e:
        # If an error occurred, return a JSON error message with a 500 Internal Server Error status code and JSON mimetype
        return Response(
            response=json.dumps(
                {
                    "message": "An error occurred while retrieving user data from the database",
                }
            ),
            status=500,
            mimetype="application/json",
        )


# update user information in profile page
@user_bp.route("/api/profile/<string:user_id>", methods=["PUT"])
def updateProfile(user_id):
    try:
        # get user object from response form
        updated_info = User().get()

        # search for user in database
        user = db.find_one({"_id": ObjectId(user_id)})

        # check if user exists
        if user is None:
            return Response(
                response=json.dumps(
                    {
                        "message": "The user data was not found in the database",
                    }
                ),
                status=404,
                mimetype="application/json",
            )
        else:
            # update user object in database with this list of data
            db.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": updated_info},
            )

            # Return a JSON message with a 200 OK status code and JSON mimetype
            return Response(
                response=json.dumps(
                    {
                        "message": "The user data was successfully updated in the database",
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
                    "message": "An error occurred while updating user data in the database",
                }
            ),
            status=500,
            mimetype="application/json",
        )
