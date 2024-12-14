Author Muhammad Tariq Khan
# Project README

This project provides a backend implementation for handling user registration, login, contact form submission, and secure PDF file management with Node.js, Express.js, and MongoDB. Below are the detailed features and instructions for running the project.

## Features

### 1. **Contact Form Submission**
- Saves user-submitted contact information (name, email, message) to the database.
- Sends confirmation emails to the user and notifications to the admin.
- Renders a thank-you page upon successful form submission.

### 2. **User Registration and Login**
- Allows new users to register with a username and password.
- Validates password confirmation during registration.
- Ensures unique usernames.
- Enables users to log in securely using JWT (JSON Web Tokens).

### 3. **PDF File Upload and Management**
- Allows users to upload PDF files to the database.
- Restricts uploads to PDF files only.
- Generates secure, tokenized download links for uploaded files.
- Enables downloading of files using token-based authentication.

## API Endpoints

### Contact Form
- **POST** `/contact/submit`
  - Saves contact information and sends emails.
  - Redirects to `/thankyou` on success.
- **GET** `/thankyou`
  - Renders a thank-you page with the user's name.

### User Authentication
- **POST** `/register`
  - Registers a new user.
  - Validates input and ensures unique usernames.
  - Redirects to `/login` on success.
- **POST** `/login`
  - Authenticates a user and generates a JWT.
  - Redirects to `/home` upon successful login.

### PDF File Management
- **POST** `/api/files/upload`
  - Uploads a PDF file.
  - Returns a tokenized download URL.
- **GET** `/api/files/download/:token`
  - Decodes the token and retrieves the corresponding file.
  - Forces the file to download.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```env
     PORT=8000
     MONGODB_URI=your-mongodb-uri
     JWT_SECRET=your-secret-key
     EMAIL_USER=your-email@example.com
     EMAIL_PASS=your-email-password
     ```

4. Start the application:
   ```bash
   npm start
   ```

## Models

### Contact Model
- **Fields:**
  - `name`: String
  - `email`: String
  - `message`: String

### User Model
- **Fields:**
  - `username`: String (unique)
  - `password`: String (hashed)

### File Model
- **Fields:**
  - `name`: String (file name)
  - `contentType`: String (e.g., `application/pdf`)
  - `data`: Buffer (file content)

## Mail Configuration
- Configured using Nodemailer.
- Requires valid email credentials for sending messages.

## Dependencies
- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose)
- **JWT** for authentication
- **Nodemailer** for email functionality

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.
