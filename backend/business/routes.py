from flask import Blueprint, Response, request, jsonify
from database import Database
import json

# Create a Flask blueprint for business related routes
business_bp = Blueprint("business", __name__)

# Get an instance of the database
db = Database.get_instance().get_db("business")


@business_bp.route("/api/business", methods=["GET"])
def get_business():
    try:
        # Query the database and convert the result to a list of Business json objects
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
                    "message": "An error occurred while fetching the business data",
                }
            ),
            status=500,
            mimetype="application/json",
        )


@business_bp.route("/api/business", methods=["POST"])
def post_business():
    try:
        # post business object to database
        business = request.get_json()
        db.insert_one(business)

        # Return a JSON message with a 200 OK status code and JSON mimetype
        return Response(
            response=json.dumps(
                {
                    "message": "The business data was successfully posted to the database",
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
