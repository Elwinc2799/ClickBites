import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from flask import Blueprint, Response, request
from database import Database
from bson import json_util
import json
from business.models import Business

business_bp = Blueprint("business", __name__)
db = Database.get_instance().get_db("business")


@business_bp.route("/business", methods=["GET"])
def get_business():
    try:
        # # Query the database and convert the result to a list of Business objects
        # cursor = db.find()
        # documents = list(cursor)
        # business = [Business(**doc) for doc in documents]

        # # Serialize the list of Business objects to a JSON string
        # json_business = json.dumps(business)

        business = list(db.find())

        json_business = json.dumps(business, default=str)

        # Return the JSON string
        return Response(
            response=json_business,
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        return Response(
            response=json_util.dumps(
                {
                    "message": "An error occurred while fetching the business data",
                }
            ),
            status=500,
            mimetype="application/json",
        )


@business_bp.route("/business", methods=["POST"])
def post_business():
    try:
        # Deserialize the JSON data into a Business object
        data = request.get_json()
        business = Business(**data)

        # Insert the Business object into the database
        db.insert_one(business.__dict__)

        # Return a success message
        return Response(
            response=json_util.dumps(
                {
                    "message": "Data successfully posted to the database",
                }
            ),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        return Response(
            response=json_util.dumps(
                {
                    "message": "An error occurred while posting the data to the database",
                }
            ),
            status=500,
            mimetype="application/json",
        )
