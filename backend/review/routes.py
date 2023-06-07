from flask import Blueprint, Response, request
from database import Database
import json
from review.models import Review
from bson.objectid import ObjectId
from ai.generate_vector import generate_vector
from bson.objectid import ObjectId


# Create a Flask blueprint for review related routes
review_bp = Blueprint("review", __name__)

# Get an instance of the database
db_review = Database.get_instance().get_db("review")
db_user = Database.get_instance().get_db("user")
db_business = Database.get_instance().get_db("business")


# create a review for a business
@review_bp.route("/api/business/<string:business_id>", methods=["POST"])
def createReview(business_id):
    try:
        # get review object from response form
        review = Review().get()

        # convert the business id to review object
        review["business_id"] = ObjectId(business_id)

        # convert the review user id to an object id
        review["user_id"] = ObjectId(review["user_id"])

        # get the vector score for the review text
        vector_score = generate_vector(review["text"])

        # add the vector score to the review object
        review["vector"] = vector_score

        # post review object to database
        db_review.insert_one(review)

        # retrieve the all reviews for the user
        user_reviews = list(db_review.find({"user_id": ObjectId(review["user_id"])}))

        # calculate the average stars and average user 5d vector score
        average_stars = 0
        average_vector_score = [0] * 5
        for user_review in user_reviews:
            average_stars += int(user_review["stars"])
            for i in range(5):
                average_vector_score[i] += float(user_review["vector"][i])
        average_stars /= len(user_reviews)

        for i in range(5):
            average_vector_score[i] /= len(user_reviews)

        # update the user object with the average stars and vector score and increment the review count
        db_user.update_one(
            {"_id": ObjectId(review["user_id"])},
            {"$set": {"average_stars": average_stars, "vector": average_vector_score}, "$inc": {"review_count": 1}},
        )

        # retrieve all reviews for the business
        business_reviews = list(db_review.find({"business_id": ObjectId(review["business_id"])}))

        # calculate the average stars and average business 5d vector score
        average_stars = 0
        average_vector_score = [0] * 5
        for business_review in business_reviews:
            average_stars += int(business_review["stars"])
            for i in range(5):
                average_vector_score[i] += float(business_review["vector"][i])
        average_stars /= len(business_reviews)

        for i in range(5):
            average_vector_score[i] /= len(business_reviews)

        print("average stars: ", average_stars)
        print("average vector score: ", average_vector_score)

        # update the business object with the average stars and vector score and increment the review count
        db_business.update_one(
            {"_id": ObjectId(business_id)},
            {"$set": {"stars": average_stars, "vector": average_vector_score}, "$inc": {"review_count": 1}},
        )

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

        # get the new vector score for the review text
        vector_score = generate_vector(updated_info["text"])

        # update review object in database with this list of data
        db_review.update_one(
            {"_id": ObjectId(review_id)},
            {
                "$set": {
                    "stars": updated_info["stars"],
                    "text": updated_info["text"],
                    "vector_score": vector_score,
                    "date": updated_info["date"],
                }
            },
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
        db_review.delete_one({"_id": ObjectId(review_id)})

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
