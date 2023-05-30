import json
from pymongo import MongoClient, InsertOne

client = MongoClient('mongodb+srv://windev:windev@cluster0.mkcvmve.mongodb.net/')
db = client.ckbt_db2

# List of collections and corresponding file paths
collections_files = [('business', './data/business.json'),
                     ('user', './data/user.json'),
                     ('review', './data/review.json')]

for collection_name, file_path in collections_files:
    collection = db[collection_name]
    requests = []

    with open(file_path, 'r') as f:
        for jsonObj in f:
            document = json.loads(jsonObj)
            requests.append(InsertOne(document))

    result = collection.bulk_write(requests)

# Create dictionary mapping business_id and user_id to _id in the 'business' and 'user' collections
business_id_map = {doc['business_id']: doc['_id'] for doc in db.business.find()}
user_id_map = {doc['user_id']: doc['_id'] for doc in db.user.find()}

# Iterate over the 'review' collection
for review in db.review.find():
    # If the business_id in the review exists in the business_id_map
    if review['business_id'] in business_id_map:
        # Update the review's business_id to the corresponding _id from 'business' collection
        db.review.update_one({'_id': review['_id']}, {'$set': {'business_id': business_id_map[review['business_id']]}})
    
    # If the user_id in the review exists in the user_id_map
    if review['user_id'] in user_id_map:
        # Update the review's user_id to the corresponding _id from 'user' collection
        db.review.update_one({'_id': review['_id']}, {'$set': {'user_id': user_id_map[review['user_id']]}})

# Remove 'business_id' from 'business' collection and 'user_id' from 'user' collection
db.business.update_many({}, {'$unset': {'business_id': ""}})
db.user.update_many({}, {'$unset': {'user_id': ""}})
db.review.update_many({}, {'$unset': {'review_id': ""}})

client.close()
