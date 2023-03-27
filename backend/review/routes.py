# # create a route to get user data
# @app.route("/api/user", methods=["GET"])
# def get_user():
#     try:
#         # access user collection
#         db = client.ckbt_db.user

#         # Query the database and convert the result to a list of dictionaries
#         user = list(db.find())

#         # Convert the list of dictionaries to a JSON string
#         json_user = json.dumps(user, default=str)

#         # Return the JSON string
#         return Response(
#             response=json_user,
#             status=200,
#             mimetype="application/json",
#         )
#     except Exception as e:
#         return Response(
#             response=json.dumps(
#                 {
#                     "message": "An error occurred while fetching the user data",
#                 }
#             ),
#             status=500,
#             mimetype="application/json",
#         )


# # create a route to get review data
# @app.route("/api/review", methods=["GET"])
# def get_review():
#     try:
#         # access review collection
#         db = client.ckbt_db.review

#         # Query the database and convert the result to a list of dictionaries
#         review = list(db.find())

#         # Convert the list of dictionaries to a JSON string
#         json_review = json.dumps(review, default=str)

#         # Return the JSON string
#         return Response(
#             response=json_review,
#             status=200,
#             mimetype="application/json",
#         )
#     except Exception as e:
#         return Response(
#             response=json.dumps(
#                 {
#                     "message": "An error occurred while fetching the review data",
#                 }
#             ),
#             status=500,
#             mimetype="application/json",
#         )
