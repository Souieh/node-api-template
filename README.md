# Node API Template

A RESTful API template built with **Express.js**, **MongoDB**, and **Passport** for authentication. This template is designed to kickstart the development of secure and scalable backend applications.

## Features

- **Authentication**: Configured with Passport (supports JWT and local strategies).
- **Database**: MongoDB integration with Mongoose for schema-based modeling.
- **Environment Configuration**: Supports `.env` files for environment-specific variables.
- **Middleware**: Includes common middlewares like `cors`, `body-parser`, and `morgan`.
- **Error Handling**: Pre-configured centralized error handling.
- **Scalable Structure**: Modular project structure for easy scaling and maintenance.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js**: v16.0.0 or higher
- **MongoDB**: A running MongoDB instance

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Souieh/node-api-template.git
   cd node-api-template
   ```

2. Install dependencies:

```bash
    npm install
```

3.  Set up your environment variables by creating a .env file at the root of the project and populating it as shown below:

```bash
# .env
DB_CONNECTION_STRING=mongodb://localhost:27017/dbname
PORT=5004
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=your_jwt_secret
MAX_LOGIN_ATTEMPTS=3
MIN_DELAY_BETWEEN_LOGIN_ATTEMPTS=60000
LOGIN_BAN_DURATION=0
BASE_NAME=/api
CLIENT_URL=http://localhost:3000
```

4.  Start the development server:

```bash
npm run dev
```

## Scripts

- `npm start`: Runs the application in production mode.
- `npm run trace`: Starts the application with detailed stack traces for debugging.
- `npm run dev`: Starts the application in development mode with nodemon for live reloads.

## Project Structure

```bash
        root/
        ├──── src/
        │     ├── app.js
        │     ├── config
        │     │   ├── envConfig.js
        │     │   ├── mongodbConfig.js
        │     │   └── passportConfig.js
        │     ├── controllers
        │     │   └── authController.js
        │     ├── middlewares
        │     │   ├── authorizations.js
        │     │   └── errorHandler.js
        │     ├── models
        │     │   └── userModels
        │     │       └── userModel.js
        │     ├── routes
        │     │   ├── authRouter.js
        │     │   └── index.js
        │     └── utils
        │         ├── asyncHandler.js
        │         ├── consoleLoggerUtils.js
        │         ├── logginUtils.js
        │         ├── picker.js
        │         ├── routeUtils.js
        │         ├── validator.js
        │         └── validators
        │             ├── translationValidator.js
        │             ├── userValidator.js
        │             └── validators.js
        ├── .env                # Environment variables
        ├── package.json        # Project metadata and scripts
        └── README.md           # Project documentation
```

## Dependencies

### Core Dependencies

- `express`: Web framework for building REST APIs.
- `mongoose`: MongoDB object modeling for Node.js.
- `passport`: Authentication middleware.
- `passport`-jwt and passport-local: Passport strategies for authentication.
- `dotenv`: Loads environment variables from .env file.

### Dev Dependencies

- `nodemon`: Automatically restarts the application during development.

## Author

[Aissa Souieh](https://github.com/Souieh)

## License

This project is licensed under the ISC License.
