# WTWR (What to Wear?): Back End

WTWR (What to Wear?) is a full-stack web application designed to help users decide which clothing items to wear based on current weather conditions. The project integrates a React-based frontend with a Node.js/Express.js backend connected to a MongoDB database. It uses the Weather API to provide weather-based recommendations, delivering a dynamic and personalized user experience.

Key Features

- Add and Manage Clothing Items:
  Users can add new clothing items, including details such as the name, an image, and the weather conditions the item is suitable for (hot, warm, cold).

- Like/Dislike Items:
  Users can "like" or "dislike" clothing items, which updates the backend database in real time. The app ensures likes are unique per user.

- Weather-Based Recommendations:
  The app filters and displays clothing items based on weather conditions retrieved from the Weather API.

- RESTful API:
  The backend exposes a RESTful API to manage users, clothing items, and likes.

## Technologies Used

Frontend:

- React.js: For building the user interface and managing application state dynamically.
- CSS: For responsive and user-friendly styling.
- Weather API: To fetch live weather data for personalized clothing recommendations.

Backend:

- Node.js and Express.js: For server-side logic and routing.
- MongoDB with Mongoose: For schema-based document storage.
- Validator: To validate input fields like URLs.
- RESTful API: Provides endpoints for CRUD operations on users and clothing items.

Development Tools & Techniques:

- ESLint & Prettier: Code linting and formatting (Airbnb Style Guide).
- Nodemon: Enables hot reload for backend development.
- Error Handling: Ensures proper status codes and messages for validation and server errors.
- Middleware: Temporary authorization middleware simulates user authentication for testing purposes.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
