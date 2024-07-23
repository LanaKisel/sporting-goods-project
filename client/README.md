# Sporting Goods React-Flask Project
Welcome to the Sporting Goods project! This application combines React on the front end with Flask on the backend to create a platform where users can manage sporting equipment listings, rent equipment, and interact with Google Maps for location-related functionalities.

## Features
### User Authentication with Auth0: 
Secure user login and authentication using Auth0.
### Google Maps API Integration:
Autocomplete for location input fields.
Displaying user listings and rental locations on a map.

### Listing Management:
View existing listings
Create new listings for sporting equipment.
Update existing listings.
Cancel listings when necessary.

### Rental Management:
Rent sporting equipment.
Update rental details.
Cancel rentals as needed.
View existing rentals

## Frontend:

React: JavaScript library for building user interfaces.
Auth0: Authentication and authorization platform.
Google Maps API: For location autocomplete and map display.
Antd: styling application
Redux toolkit: global state, api query

## Backend:

Flask: Micro web framework for Python.
SQLAlchemy: SQL toolkit and Object-Relational Mapping (ORM) for Python.

## Deployment

Deployed on Render

## Installation

To run this project locally, follow these steps:
Clone the repository:
git clone https://github.com/LanaKisel/sporting-goods-project
cd repository-folder

### Set up Auth0:

Create a free account on Auth0 (if you haven't already).
Set up a new application and configure it to use Auth0 for authentication.
Note down the Client ID and Domain.
Configure Environment Variables:

Create a .env file in the root directory.
Add the following variables:
makefile
Copy code
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
REACT_APP_API_BASE_URL=http://localhost:5000/api  # Adjust if Flask runs on a different port
Install Dependencies:

## Run application locally 

### For the frontend (React):
cd client
npm install
npm start
### For the backend (Flask):

pip install -r requirements.txt
pipenv shell
cd server
python app.py

Open your browser and go to http://localhost:3000 to view the Sporting Goods application.

## Resources

Ant design: https://ant.design

GoogleMaps API: https://console.cloud.google.com/google/maps-apis/home?project=sporting-goods-430303

Auth0 website: https://auth0.com/?utm_content=usbranded-auth0-auth0homepage&utm_source=google&utm_campaign=amer_namer_usa_all_ciam-all_dg-ao_auth0_search_google_text_kw_Brand_utm2&utm_medium=cpc&utm_id=aNK4z000000UEiRGAW&gad_source=1&gclid=CjwKCAjwqf20BhBwEiwAt7dtdbGhksbwmOaZryMtFZ7NbKZx3XPNA5rXOHab1pmqRRG6uucoRxQKahoCahkQAvD_BwE

Auth0 QuickStart: https://manage.auth0.com/dashboard/us/dev-pq7dg4vajftv7igc/applications/TE6MVyIwPhTXTcWKUjgqk3dtvP9CXTYo/quickstart/react

Flask API QuickStart: https://auth0.com/docs/quickstart/backend/python/interactive 

Redux Toolkit: https://redux-toolkit.js.org