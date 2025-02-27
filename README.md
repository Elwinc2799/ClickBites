# ClickBites - ABSA Restaurant Recommendation System

Welcome to ClickBites, an innovative full-stack restaurant recommendation system that leverages the power of aspect-based sentiment analysis of reviews. Our system analyses a vast range of restaurant reviews, primarily focusing on the Yelp Open Dataset (US restaurants), but we have also included a selection of local Malaysian restaurants to broaden your dining horizon.  

## Overview

ClickBites utilizes a high-tech AI modeling pipeline that includes a fine-tuned BERT model for aspect extraction and the VADER sentiment analyzer. The system identifies five key aspects: food, service, price, ambience, and miscellaneous factors. Each review is represented by a 5D vector, the result of mapping each aspect-opinion pair's polarity. Then, we calculate the preference score for each user entity and the aspect score for each restaurant entity. Ultimately, we generate personalized restaurant recommendations ranked using cosine similarity metrics.

Our tech stack includes the Next.js front-end framework using Typescript, the Flask back-end framework using Python, CRUD operations implemented using REST API, and MongoDB as the cloud database.

## Setting Up and Running ClickBites

Follow the steps below to setup and run ClickBites on your local environment:

### Prerequisites

Ensure the following technologies are installed on your machine:
- Node.js and npm
- Python 3.10
- MongoDB 

### Steps

1. **Clone the Repository**: 

   ```
   git clone https://github.com/Elwinc2799/ClickBites.git
   ```
   
2. **Front-End Setup**:

    Navigate to the front-end directory:

    ```
    cd frontend
    ```

    Install the necessary npm packages using yarn or npm:

    ```
    yarn install 
    ```
    or 
    ```
    npm install
    ```

    Create a `next.config.js` file in the root of your frontend folder. Paste the following code into the file:

    ```javascript
    /** @type {import('next').NextConfig} */
    const nextConfig = {
        reactStrictMode: true,
    };

    module.exports = {
        env: {
            API_URL: 'http://127.0.0.1:5000',
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: 'xxxxxxxx',
        },
    };
    ```
    Replace `'xxxxxxxx'` with your Google Maps API Key.

    To run the application, start the Next.js server by running:

    ```
    yarn dev
    ```
    or
    ```
    npm run dev
    ```

    By default, the server runs on `http://localhost:3000`

3. **Back-End Setup**:

    Follow these steps to set up the back-end for different operating systems:

    For Unix or MacOS:

    1. Open a new terminal window, navigate to the back-end directory:
        ```
        cd backend
        ```
    2. Create a `config.py` file in the root of your backend folder. Paste the following code into the file:
        ```
        MONGO_URI = "xxxxxxxx"
        MONGO_PORT = 5000
        MONGO_TIMEOUT = 1000
        ```
        Replace "xxxxxxxx" with your MongoDB connection string.
    3. Download the `fine_tuned_model` folder and `label_encoder.pkl` file from the provided link:

        ```
        https://drive.google.com/drive/folders/1KruFCU66A7bPACEN3owDbu7JeC3wR6QY?usp=sharing
        ```
    4. Save these files into the `backend/ai` directory of your local project repository.
    5. Create a new Conda environment and activate it:
        ```
        conda create --name myenv python=3.10
        conda activate myenv
        ```
    6. Install the necessary packages using:
        ```
        conda install --file requirements.txt
        ```
        or
        ```
        conda env update --name myenv --file environment.yml
        ```
    7. Start the Flask server:
        ```
        python3 app.py
        ```
    By default, the server runs on `http://localhost:5000`

    For Windows:

    1. Open Command Prompt, navigate to the back-end directory:
        ```
        cd backend
        ```
    2. Create a `config.py` file in the root of your backend folder. Paste the following code into the file:
        ```
        MONGO_URI = "xxxxxxxx"
        MONGO_PORT = 5000
        MONGO_TIMEOUT = 1000
        ```
        Replace "xxxxxxxx" with your MongoDB connection string.
    3. Download the `fine_tuned_model` folder and `label_encoder.pkl` file from the provided link:

        ```
        https://drive.google.com/drive/folders/1KruFCU66A7bPACEN3owDbu7JeC3wR6QY?usp=sharing
        ```
    4. Save these files into the `backend/ai` directory of your local project repository.
    5. Create a new Conda environment and activate it:
        ```
        conda create --name myenv python=3.8
        activate myenv
        ```
    6. Install the necessary packages:
        ```
        conda install --file requirements.txt
        ```
        or
        ```
        conda env update --name myenv --file environment.yml
        ```
    7. Start the Flask server:
        ```
        python app.py
        ```
    By default, the server runs on `http://localhost:5000`

    **Note:** 
    - The `environment.yml` file is a file you should create when you export your Conda environment using the command `conda env export > environment.yml`.
    - Before starting, ensure that you have [Anaconda](https://www.anaconda.com/products/distribution) or [Miniconda](https://docs.conda.io/en/latest/miniconda.html) installed. These distribution packages include Conda, Python, and other commonly used packages in scientific computing and data science.

    Ensure you have the necessary permissions to execute these commands in your terminal/command prompt. If there are permission issues, try running the Command Prompt as an Administrator or consult the respective software documentation.

4. **Database Setup**:

    Make sure MongoDB service is running on your machine. To set up the database:

    1. To download the photos for each restaurant:

    Navigate to `https://www.yelp.com/dataset/download` to download the photos content.

    2. Move the downloaded photos.json to the directory which contains the photos_mapping.py and business.json file. 

    3. Start the mapping process to select the photos based on available business ids:
    
    For Unix or MacOS, 

    ```
    cd data
    python3 photos_mapping.py 
    ```
    
    For Windows, 

    ```
    cd data
    py photos_mapping.py
    ```

    A `business_photo` folder containing all required business photos is created.

    4. Move the `business_photo` folder to `./frontend/public`

    5. Start the import process:
    
    For Unix or MacOS,

    ```
    python3 import_json.py
    ```
    
    For Windows,
    ```
    py import_json.py
    ```
    
    The application will automatically create the necessary database and collections based on the provided schema in the code.

5. **Connecting the Dots**:

    Once the front-end and back-end servers are running, and the database is set, navigate to `http://localhost:3000` on your browser to start using ClickBites.

## Conclusion

With ClickBites, we aim to revolutionize the way you choose your dining experiences. By using AI technologies to understand your unique preferences, we provide highly personalized restaurant recommendations that cater to your taste. Enjoy discovering new restaurants with ClickBites!

Please feel free to contribute to this project by submitting issues or pull requests.

## License

This project is licensed under the terms of the MIT license.