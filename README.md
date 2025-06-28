# Grubstake Backend

**Grubstake** is a comprehensive Scholarship and Loan Management System backend, built with Express and MongoDB. It provides RESTful APIs for users, banks, admins, and supports JWT authentication and email notifications.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Backend](#running-the-backend)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Screenshots](#screenshots)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Anubhavprogramer/Grubstake
   cd Grubstake/Grubstake_Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

- Create a `.env` file in the root of `Grubstake_Backend`:
  ```env
  PORT=8000
  DB_URI=mongodb://localhost:27017/grubstake
  COOKIE_EXPIRE=7
  JWT_SECRET=your_jwt_secret
  JWT_EXPIRE=7d
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_SERVICE=Gmail
  SMTP_MAIL=your_email@gmail.com
  SMTP_PASSWORD=your_email_password
  ```

## Running the Backend

- Start the development server:
  ```bash
  npm run dev
  ```
- The backend will run at `http://localhost:8000` by default.

## API Endpoints
- `/api/v2/user/*` — User registration, login, profile, etc.
- `/api/v3/bank/*` — Bank registration, login, profile, loan management
- `/api/v1/admin/*` — Admin dashboard, stats, management
- `/api/v3/bank/loan` — Get all loans
- `/api/v3/bank/loan/create` — Create a new loan (bank/admin only)
- `/api/v3/bank/loan/:id` — Get loan details
- `/api/v3/bank/loan/delete/:id` — Delete a loan (bank only)
- `/api/v1/scholarship/*` — Scholarship management

## Authentication
- JWT tokens are used for authentication for users, banks, and admins.
- Tokens can be sent via cookies or the `Authorization` header.
- Role-based access is enforced for protected routes.

## Technologies Used
- **Express**
- **MongoDB**
- **JWT (JSON Web Tokens)**
- **Nodemailer** (Gmail SMTP)
- **Mongoose**

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Screenshots

<!-- Add screenshots here -->

## License
MIT

