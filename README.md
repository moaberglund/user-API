# User Authentication API

A simple RESTful API for user registration, login, and profile management. It includes JWT authentication and uses MongoDB for data storage.

## Features
- User Registration (`POST /user/register`)
- User Login (`POST /user/login`)
- View User Profile (`GET /user/profile`)
- Update User Profile (`PUT /user/profile`)
- Delete User (`DELETE /user/profile`)
- Protected Routes with JWT Authentication


## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root of the project or feel free to re-purpose the .env.sample (just delete .sample from filename).
    - Add/update the following variables:
      ```env
      PORT=
      DATABASE=<your-mongo-db-connection-string>
      JWT_SECRET=<your-jwt-secret>
      ```

4. Start the server:
    ```bash
    npm start
    ```

The server will start on `http://localhost:8000` if nothing else is specified in .env.

## API Endpoints

### `POST /user/register`
- Registers a new user.
- **Body Parameters**:
    ```json
    {
      "username": "user123",
      "password": "securepassword"
    }
    ```

### `POST /user/login`
- Logs in the user and returns a JWT token.
- **Body Parameters**:
    ```json
    {
      "username": "user123",
      "password": "securepassword"
    }
    ```

### `GET /user/profile`
- Retrieves the logged-in user's profile (protected route).
- **Headers**: 
    - `Authorization: Bearer <your-jwt-token>`

### `PUT /user/profile`
- Updates the logged-in user's profile.
- **Body Parameters**:
    ```json
    {
      "email": "user@example.com",
      "firstname": "John",
      "lastname": "Doe",
      "age": 25
    }
    ```
- **Headers**:
    - `Authorization: Bearer <your-jwt-token>`

### `DELETE /user/profile`
- Deletes the user's profile (password required).
- **Body Parameters**:
    ```json
    {
      "username": "user123",
      "password": "securepassword"
    }
    ```
- **Headers**:
    - `Authorization: Bearer <your-jwt-token>`

## Testing

You can use tools like **Postman** or **Thunder Client** to test the API endpoints.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
