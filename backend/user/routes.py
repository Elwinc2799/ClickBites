from flask import Blueprint, Response, request, jsonify
from database import Database
import json
from user.models import User
from bson.objectid import ObjectId
import jwt


# Create a Flask blueprint for user related routes
user_bp = Blueprint("user", __name__)

# Get an instance of the database
db_business = Database.get_instance().get_db("user")
db_review = Database.get_instance().get_db("review")

# signup
@user_bp.route("/api/signup", methods=["POST"])
def signUp():
    try:
        # get user object from response form
        user = User().get()

        # TODO: Validate user input and create a new user in your database
        # ...

        # search for user in database
        document = db_business.find_one({"email": user.get("email")})

        # check if user exists
        if document is None:
            # post user object to database
            db_business.insert_one(user)

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
        user = db_business.find_one(user)

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


# retrieve user_id from token
@user_bp.route("/api/getUserId", methods=["GET"])
def getUserId():
    # get the token from the Authorization header
    auth_header = request.headers.get("Authorization")
    if auth_header is None:
        return jsonify({"error": "Authorization header is missing"}), 401
    try:
        auth_token = auth_header.split(" ")[1]
    except IndexError:
        return jsonify({"error": "Invalid Authorization header format"}), 401

    # the secret key used to sign the token
    secret = "super-secret-key"

    try:
        # decode the token
        decoded = jwt.decode(auth_token, secret, algorithms=["HS256"])

        # the "sub" property contains the user ID
        user_id = decoded["sub"]

        # return the user ID as a JSON response
        return jsonify({"userId": user_id})

    except jwt.ExpiredSignatureError:
        # handle the case where the token has expired
        return jsonify({"error": "Token has expired"}), 401

    except jwt.InvalidTokenError:
        # handle the case where the token is invalid
        return jsonify({"error": "Invalid token"}), 401



# retrieve user profile
@user_bp.route("/api/profile/<string:user_id>", methods=["GET"])
def retrieveProfile(user_id):
    try:
        # get user object from database
        document = db_business.find_one({"_id": ObjectId(user_id)})

        # check if user exists
        if document is None:
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
            # get all reviews for business
            reviews = list(db_review.find({"user_id": ObjectId(user_id)}))

            document["reviews"] = reviews
            # Serialize the retrieved document to a JSON string
            user = json.dumps(document, default=str)

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
        user = db_business.find_one({"_id": ObjectId(user_id)})

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
            db_business.update_one(
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
