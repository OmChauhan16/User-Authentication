# MERN Authentication App

This is a full-stack authentication application built using the MERN stack (MongoDB, Express, React, and Node.js) with JWT-based authentication. It includes features for user registration, login, and protected routes that require authentication.

## Project Structure

- `/backend` - Contains the Express server, routes, and MongoDB models
- `/frontend` - Contains the React code (using Vite for development)
- `/routes` - API routes for authentication (signup, login)
- `/models` - MongoDB models for storing user data
- `.env` - Configuration file for environment variables

## Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/OmChauhan16/User-Authentication.git]
   cd User-Authentication
   
Install dependencies for the backend:
   cd backend
   npm install

Install dependencies for the frontend:
   cd ../frontend
   npm install

Create a .env file in the /backend folder to store environment variables:
MONGO_URI=mongodb://localhost:27017/mydatabase
JWT_SECRET=your_jwt_secret_key


### 5. **Running the Project**
   Run fronend:
   npm run dev

   Run backend:
   npm start
   
# Start the MongoDB service on your local machine:


### 6. **Usage**
   Explain how to use the app, such as accessing routes or functionalities.

```md
## Usage

1. Navigate to `http://localhost:5173` to access the login and signup forms.
2. Register a new user.
3. Login with your credentials.
4. You will be redirected to a protected route (`/welcome`) upon successful login.
5. The JWT token is stored in `localStorage` and used for accessing protected routes.

### 7. API Endpoints

- `POST /api/signup` - Register a new user
- `POST /api/login` - Login an existing user
- `POST /welcome` - Access a protected route after authentication

## Technologies Used

- **MongoDB** - Database for storing user data
- **Express.js** - Backend framework for handling API requests
- **React.js** - Frontend library for building user interfaces
- **Node.js** - JavaScript runtime environment for running the backend
- **JWT** - JSON Web Tokens for secure authentication





