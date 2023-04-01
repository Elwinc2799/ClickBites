from flask import Blueprint, Response, request, jsonify
from database import Database
import json
from bson.objectid import ObjectId
from business.models import Business


# Create a Flask blueprint for business related routes
business_bp = Blueprint("business", __name__)

# Get an instance of the database
db_business = Database.get_instance().get_db("business")
db_review = Database.get_instance().get_db("review")


# register a new business
@business_bp.route("/api/business", methods=["POST"])
def registerBusiness():
    try:
        # get business object from response form
        business = Business().get()

        # search for business in database
        document = db_business.find_one({"name": business.get("name")})

        # check if business exists
        if document is None:
            # post business object to database
            db_business.insert_one(business)

            # Return a JSON message with a 200 OK status code and JSON mimetype
            return Response(
                response=json.dumps({"message": "The business data was successfully posted to the database"}),
                status=200,
                mimetype="application/json",
            )
        else:
            return Response(
                response=json.dumps(
                    {
                        "message": "The business data was not posted to the database because it already exists",
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
                    "message": "An error occurred while posting business data to the database",
                }
            ),
            status=500,
            mimetype="application/json",
        )


# retrieve a list of businesses
@business_bp.route("/api/business", methods=["GET"])
def getBusinesses():
    try:
        # Query the database and convert the result to a list of Business json objects
        documents = list(db_business.find())

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
                    "message": "An error occurred while fetching the business data",
                }
            ),
            status=500,
            mimetype="application/json",
        )


# retrieve a business details
@business_bp.route("/api/business/<string:business_id>", methods=["GET"])
def getBusinessDetails(business_id):
    try:
        # get business object from database
        document = db_business.find_one({"_id": ObjectId(business_id)})

        # check if business exists
        if document is None:
            return Response(
                response=json.dumps(
                    {
                        "message": "The business data was not found in the database",
                    }
                ),
                status=404,
                mimetype="application/json",
            )
        else:
            # get all reviews for business
            reviews = list(db_review.find({"business_id": ObjectId(business_id)}))

            document["reviews"] = reviews

            # Serialize the retrieved document to a JSON string
            business = json.dumps(document, default=str)

            # Return the JSON string with a 200 OK status code and JSON mimetype
            return Response(
                response=business,
                status=200,
                mimetype="application/json",
            )

    except Exception as e:
        # If an error occurred, return a JSON error message with a 500 Internal Server Error status code and JSON mimetype
        return Response(
            response=json.dumps(
                {
                    "message": "An error occurred while retrieving business data from the database",
                }
            ),
            status=500,
            mimetype="application/json",
        )


# update business details
@business_bp.route("/api/business/<string:business_id>", methods=["PUT"])
def updateBusiness(business_id):
    try:
        # get business object from response form
        updated_info = Business().get()

        # search for business in database
        business = db_business.find_one({"_id": ObjectId(business_id)})

        # check if business exists
        if business is None:
            return Response(
                response=json.dumps(
                    {
                        "message": "The business data was not found in the database",
                    }
                ),
                status=404,
                mimetype="application/json",
            )
        else:
            # update business object in database with this list of data
            db_business.update_one(
                {"_id": ObjectId(business_id)},
                {"$set": updated_info},
            )

            # Return a JSON message with a 200 OK status code and JSON mimetype
            return Response(
                response=json.dumps(
                    {
                        "message": "The business data was successfully updated in the database",
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
                    "message": "An error occurred while updating business data in the database",
                }
            ),
            status=500,
            mimetype="application/json",
        )


# delete a business
@business_bp.route("/api/business/<string:business_id>", methods=["DELETE"])
def deleteReview(business_id):
    try:
        # delete business object from database
        db_business.delete_one({"_id": ObjectId(business_id)})

        # delete review object from database
        db_review.delete_many({"business_id": ObjectId(business_id)})

        # Return a JSON message with a 200 OK status code and JSON mimetype
        return Response(
            response=json.dumps({"message": "The business data was successfully deleted from the database"}),
            status=200,
            mimetype="application/json",
        )

    except Exception as e:
        # If an error occurred, return a JSON error message with a 500 Internal Server Error status code and JSON mimetype
        return Response(
            response=json.dumps(
                {
                    "message": "An error occurred while deleting the business data from the database",
                }
            ),
            status=500,
            mimetype="application/json",
        )


# ************* Save retrieved data to a Business object ********************************
# from business.models import Business
# from business.models import Hours
#
# # Convert a list of dictionaries to a list of Business objects
# def json_to_business(json_list: List) -> List[Business]:
#     businesses = []
#     for item in json_list:
#         # Create a Hours object for the business
#         hours = Hours(
#             Monday=item["hours"].get("Monday", "") if item["hours"] else "",
#             Tuesday=item["hours"].get("Tuesday", "") if item["hours"] else "",
#             Wednesday=item["hours"].get("Wednesday", "") if item["hours"] else "",
#             Thursday=item["hours"].get("Thursday", "") if item["hours"] else "",
#             Friday=item["hours"].get("Friday", "") if item["hours"] else "",
#             Saturday=item["hours"].get("Saturday", "") if item["hours"] else "",
#             Sunday=item["hours"].get("Sunday", "") if item["hours"] else "",
#         )
#         # Create a Business object for the business
#         business = Business(
#             id=str(item["_id"]),
#             name=item["name"],
#             address=item["address"],
#             city=item["city"],
#             state=item["state"],
#             latitude=item["latitude"],
#             longitude=item["longitude"],
#             stars=item["stars"],
#             review_count=item["review_count"],
#             is_open=item["is_open"],
#             categories=item["categories"],
#             hours=hours,
#             description=item.get("description", ""),
#             view_count=item.get("view_count", 0),
#         )
#         businesses.append(business)
#     return businesses
#
# @business_bp.route("/business", methods=["GET"])
# def get_business():
#     try:
#         # Convert documents to a list of Business objects
#         business = json_to_business(documents)

#         # Serialize the list of Business objects to a JSON string
#         json_business = json_util.dumps([b.dict() for b in business])

#         Return a JSON message with a 200 OK status code and JSON mimetype

#         Return the JSON string with a 200 OK status code and JSON mimetype
#         return Response(
#             response=json_business,
#             status=200,
#             mimetype="application/json",
#         )
#     except Exception as e:
#         # If an error occurred, return a JSON error message with a 500 Internal Server Error status code and JSON mimetype
#         return Response(
#             response=json.dumps(
#                 {
#                     "message": "An error occurred while fetching the business data",
#                 }
#             ),
#             status=500,
#             mimetype="application/json",
#         )
# #######################################################################################
