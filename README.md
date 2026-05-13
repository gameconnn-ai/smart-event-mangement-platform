# Smart Event Management & Ticketing Platform

## Project Overview

The Smart Event Management & Ticketing Platform is a full-stack web application developed to help organizations manage events, ticket bookings, attendance, and customer engagement efficiently.

The system solves issues such as:

* Overbooking
* Poor booking management
* Weak access control
* Manual event handling
* Lack of analytics

The platform allows users to:

* Register and login securely
* Browse and search events
* Book tickets
* View booking history
* Contact administrators

Administrators can:

* Create, edit, and delete events
* View analytics dashboards
* Manage enquiries
* Control event capacity

---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* EJS
* TailwindCSS / Bootstrap
* bcrypt
* dotenv

---

## MVC Architecture

The project follows the MVC (Model View Controller) architecture.

### Models

Handle MongoDB database schemas and data logic.

### Views

Handle frontend pages using EJS templates.

### Controllers

Handle application business logic and route processing.

---

## Team Members & Roles

### Member 1 - Project Lead & Documentation

* GitHub management
* MVC setup
* Architecture diagrams
* Documentation
* Testing coordination

### Member 2 — Frontend Developer

* UI/UX design
* EJS pages
* Responsive layouts

### Member 3 - Backend Developer

* Authentication system
* Booking system
* Middleware

### Member 4 - Database Engineer

* MongoDB schemas
* CRUD operations
* Database validation

### Member 5 - Security & Dashboard

* Role-based access control
* Analytics dashboard
* Contact system

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <repository-link>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection
SESSION_SECRET=your_secret_key
```

### 4. Start MongoDB

Ensure MongoDB is running locally or use MongoDB Atlas.

### 5. Run Application

```bash
npm run dev
```

---

## Features

* User authentication
* Event management
* Ticket booking system
* Capacity validation
* Admin dashboard
* Contact/enquiry system
* Search and filtering

---

## Screenshots

### Home Page

![Home](./images/Home.jpeg)

### Login Page

![Login](./images/Login.jpeg)

### Dashboard

![Dashboard](./images/Dashboard.jpeg)

### Booking System

![Booking](./images/Booking.jpeg)

---
## Architecture diagrams

### 1. System Architecture Diagram
![System](./images/System.jpeg)
### 2. MVC Architecture Diagram
![MVC](./images/new.jpeg)
### 3. Booking Flow Diagram
![Bookings](./images/Bookings.jpeg)
### 4. Authentication Flow Diagram
![Auth](./images/Auth.jpeg)

## Reflection

### Challenges Faced

* Managing integration between frontend and backend
* Handling authentication securely
* Organizing team collaboration

### What We Learned

* MVC architecture
* MongoDB integration
* GitHub collaboration
* Full-stack development workflow

### Future Improvements

* Online payment integration
* Email notifications
* QR code ticketing
* Advanced analytics
