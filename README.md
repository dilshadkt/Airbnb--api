# Airbnb API

### Overview

This API powers an Airbnb clone, built with Express.js 🚀 and MongoDB 🗄️. It supports three main modules: User 👤, Host 👯‍♂️, and Admin 👨‍🏭, and includes features like JWT authentication 🔒, Twilio SMS integration 📞, and Nodemailer ✉️ for email notifications.


## Features

-   User Module: Authentication and profile management.
  
-   Host Module: Property listing management.
  
-   Admin Module: User and property moderation.
    
-   JWT Authentication: Secure user sessions.
   
-   Twilio Integration: SMS notifications.

-   Nodemailer Integration: Email communication
  

## Technologies Used


## Installation and Setup

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB (local or Atlas)

## Frontend Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/airbnb-api.git
cd airbnb-api

cd timemanagementapp/frontend
```

2. Install dependencies:

```bash
npm install

```

3. Run the development server:

```bash

npm start

```



Open [http://localhost:3000](http://localhost:8080) with your browser to see the result.



## API Endpoints

## Authentication

- POST /api/auth/register: Register a new user
- POST /api/auth/login: Log in a user

## User Module

- GET /api/users/
: Get user profile
- PUT /api/users/
: Update user profile

## Host Module
- POST /api/properties: Add a new property
- GET /api/properties/
: Get property details

## Admin Module

- GET /api/admin/users: Get all users
- DELETE /api/admin/users/
: Delete a user


## Contributing

### Contributions are welcome! Please follow these steps:

### Fork the repository.

1. Create a new branch (git checkout -b feature/YourFeature).

2. Commit your changes (git commit -m 'Add some feature').

3. Push to the branch (git push origin feature/YourFeature).

4. Open a pull request.

5. 

## License

Feel free to use, modify, and distribute this code. Contributions are welcome!
