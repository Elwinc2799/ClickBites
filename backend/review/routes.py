from flask import Blueprint, Response, request
from database import Database
import json
from review.models import Review
from bson.objectid import ObjectId


# Create a Flask blueprint for review related routes
review_bp = Blueprint("review", __name__)

# Get an instance of the database
db = Database.get_instance().get_db("review")

# create a review for a business
@review_bp.route("/api/business/<string:business_id>", methods=["POST"])
def createReview(business_id):
    try:
        # get review object from response form
        review = Review().get()

        # add business id to review object
        review["business_id"] = ObjectId(business_id)

        # post review object to database
        db.insert_one(review)

        # Return a JSON message with a 200 OK status code and JSON mimetype
        return Response(
            response=json.dumps({"message": "The review data was successfully posted to the database"}),
            status=200,
            mimetype="application/json",
        )

    except Exception as e:
        # If an error occurred, return a JSON error message with a 500 Internal Server Error status code and JSON mimetype
        return Response(
            response=json.dumps(
                {
                    "message": "An error occurred while posting the review data to the database",
                }
            ),
            status=500,
            mimetype="application/json",
        )


# update a review for a business
@review_bp.route("/api/business/<string:business_id>/<string:review_id>", methods=["PUT"])
def updateReview(business_id, review_id):
    try:
        # get review object from response form
        updated_info = Review().get()

        # update review object in database with this list of data
        db.update_one(
            {"_id": ObjectId(review_id)},
            {"$set": updated_info},
        )

        # Return a JSON message with a 200 OK status code and JSON mimetype
        return Response(
            response=json.dumps(
                {
                    "message": "The review data was successfully updated in the database",
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
                    "message": "An error occurred while updating review data in the database",
                }
            ),
            status=500,
            mimetype="application/json",
        )


# delete a review for a business
@review_bp.route("/api/business/<string:business_id>/<string:review_id>", methods=["DELETE"])
def deleteReview(business_id, review_id):
    try:
        # delete review object from database
        db.delete_one({"_id": ObjectId(review_id)})

        # Return a JSON message with a 200 OK status code and JSON mimetype
        return Response(
            response=json.dumps({"message": "The review data was successfully deleted from the database"}),
            status=200,
            mimetype="application/json",
        )

    except Exception as e:
        # If an error occurred, return a JSON error message with a 500 Internal Server Error status code and JSON mimetype
        return Response(
            response=json.dumps(
                {
                    "message": "An error occurred while deleting the review data from the database",
                }
            ),
            status=500,
            mimetype="application/json",
        )
