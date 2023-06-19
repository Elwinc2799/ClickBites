import os
import json
import random
from PIL import Image
import shutil


def display_business_photos(business_id, photos):
    """
    Display the photos associated with a business.
    """
    photos_folder = "photos"  # Folder containing the photos

    # Iterate over the photos and display them
    for photo in photos:
        photo_id = photo["photo_id"]
        label = photo["label"]
        photo_file_path = os.path.join(photos_folder, f"{photo_id}.jpg")

        if os.path.exists(photo_file_path):
            # Load and display the photo
            image = Image.open(photo_file_path)
            image.show()
            print(f"Photo ID: {photo_id}")
            print(f"Label: {label}")
            print()
        else:
            print(f"Photo file not found: {photo_file_path}")


def move_photo_to_folder(business_id, photo_id, destination_folder):
    """
    Move a photo to the specified destination folder.
    """
    photos_folder = "photos"  # Folder containing the photos

    # Create the destination folder if it doesn't exist
    os.makedirs(destination_folder, exist_ok=True)

    # Copy the photo to the destination folder and change its name to the business ID
    source_file_path = os.path.join(photos_folder, f"{photo_id}.jpg")
    destination_file_path = os.path.join(destination_folder, f"{business_id}.jpg")
    shutil.copyfile(source_file_path, destination_file_path)


# Read the JSON file
json_file_path = "photos.json"
photo_data = []
with open(json_file_path) as file:
    for line in file:
        try:
            photo = json.loads(line)
            photo_data.append(photo)
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON: {e}")

# # Create a set of all unique labels
# all_labels = set(photo['label'] for photo in photo_data)

# Initialize a dictionary to store the businesses with all labels available
businesses_having_photos = {}

# import business json
business_json_file_path = "business.json"
business_data = []
with open(business_json_file_path) as file:
    for line in file:
        try:
            business = json.loads(line)
            business_data.append(business)
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON: {e}")

# get unique business ids
business_ids = set(business["business_id"] for business in business_data)

j = 0
k = 0
# Iterate over the business IDs
for business_id in set(photo["business_id"] for photo in photo_data):
    # check if business id is in business_ids
    if business_id in business_ids:
        # Filter photos for the current business ID
        business_photos = [photo for photo in photo_data if photo["business_id"] == business_id]

        # # Get the set of labels available for the current business
        # available_labels = set(photo['label'] for photo in business_photos)

        # # Check if all the labels are available for the current business
        # if all_labels.issubset(available_labels):

        # Get the list of photos with their IDs and labels for the current business
        photos = [{"photo_id": photo["photo_id"], "label": photo["label"], "business_id": photo["business_id"]} for photo in business_photos]
        businesses_having_photos[business_id] = photos
        j += 1
        print(j, "business")
    else:
        k += 1
        print(k, "business")

print("Done listing businesses")
print("Total businesses having photo: ", j)
print("Total businesses not having photo: ", len(business_ids) - j)
# temp = 0
# for key, value in businesses_having_photos.items():
#     print(key, value)
#     temp += 1
#     if temp == 10:
#         break
choice = int(input("Proceed?: "))

i = 0
l = 0
# Iterate over the businesses with all labels available and display their associated photos
for business_id, photos in businesses_having_photos.items():
    i += 1
    print(f"{i} Business ID: {business_id}")
    # print("Displaying photos:")
    # display_business_photos(business_id, photos)

    selected_photos = [photo for photo in photos if photo["label"] == "food" or photo["label"] == "drink" or photo["label"] == "inside"]
    if selected_photos:
        # check if there is a photo with label food, drink and inside
        food_photos = [photo for photo in selected_photos if photo["label"] == "food"]
        drink_photos = [photo for photo in selected_photos if photo["label"] == "drink"]
        inside_photos = [photo for photo in selected_photos if photo["label"] == "inside"]

        if food_photos:
            # generate random integer between 0 and len(food_photos)-1
            selected_photo_index = random.randint(0, len(food_photos) - 1)
            selected_photo_id = food_photos[selected_photo_index]["photo_id"]
        elif drink_photos:
            # generate random integer between 0 and len(drink_photos)-1
            selected_photo_index = random.randint(0, len(drink_photos) - 1)
            selected_photo_id = drink_photos[selected_photo_index]["photo_id"]
        else:
            # generate random integer between 0 and len(inside_photos)-1
            selected_photo_index = random.randint(0, len(inside_photos) - 1)
            selected_photo_id = inside_photos[selected_photo_index]["photo_id"]

        # select the first photo in the selected_photos list
        # selected_photo_id = selected_photos[0]['photo_id']
        print(f"Selected photo ID: {selected_photo_id}")

        # Move the selected photo to the 'business_photo' folder
        move_photo_to_folder(business_id, selected_photo_id, "business_photo")
        l += 1
    
    print()

print()
print("Total photos: ", l)