# Smart Event Management & Ticketing Platform

**WPR381 Group Project | Belgium Campus iTversity | 2026**

---

## Project Overview

A full-stack web application that allows Advanced Events (Pty) Ltd to manage events, sell tickets, and handle customer enquiries online. Built with Node.js, Express, EJS, and MongoDB.

---

## Technologies Used

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Templating | EJS (Embedded JavaScript) |
| Database | MongoDB + Mongoose ODM |
| Styling | Bootstrap 5 + Custom CSS |
| Authentication | express-session + bcrypt |
| Environment | dotenv |
| Dev Tool | nodemon |

---

## Team Members and Roles

| Member | Role |
|---|---|
| Member 1 | Team Lead / Project Coordinator |
| Member 2 | Backend Developer |
| Member 3 | Frontend Developer |
| Member 4 | Database Engineer |
| Member 5 | Security / DevOps Engineer |

---

## Folder Structure

```
smart-events/
├── models/                  ← MongoDB schemas (M in MVC)
│   ├── User.js
│   ├── Event.js
│   ├── Booking.js
│   └── Enquiry.js
├── views/                   ← EJS templates (V in MVC)
│   ├── partials/
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   ├── events/
│   │   ├── manage.ejs
│   │   ├── create.ejs
│   │   └── edit.ejs
│   ├── dashboard/
│   │   ├── user.ejs
│   │   └── admin.ejs
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── contact.ejs
│   ├── enquiries.ejs
│   └── error.ejs
├── controllers/             ← Business logic (C in MVC)
│   ├── authController.js
│   ├── eventController.js
│   ├── bookingController.js
│   └── contactController.js
├── routes/                  ← URL-to-controller mappings
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   ├── bookingRoutes.js
│   └── contactRoutes.js
├── middleware/              ← Auth/error guards
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── public/                  ← Static files
│   └── css/
│       └── style.css
├── .env                     ← Environment variables (not on GitHub)
├── .gitignore
├── app.js                   ← Server entry point
├── seed.js                  ← Database seed script
└── package.json
```

---

## Setup Instructions

### Prerequisites
- Node.js installed (v18 or higher recommended)
- MongoDB installed locally OR a MongoDB Atlas account

### Step 1 — Clone the repository
```bash
git clone <your-github-repo-url>
cd smart-events
```

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Set up the environment file
Create a `.env` file in the root folder:
```
MONGO_URI=mongodb://localhost:27017/smart_events
SESSION_SECRET=mySecretKey123
PORT=3000
```

### Step 4 — Seed the database (creates admin account + demo events)
```bash
node seed.js
```

### Step 5 — Run the development server
```bash
npm run dev
```

Open your browser and go to: **http://localhost:3000**

---

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@smartevents.com | admin123 |
| User | jane@example.com | user123 |

---

## Key Pages

| URL | Description | Access |
|---|---|---|
| `/` | Home - event listing + search | Everyone |
| `/auth/register` | Create an account | Guests only |
| `/auth/login` | Log in | Guests only |
| `/events/manage` | View/edit/delete events | Admin only |
| `/events/create` | Create a new event | Admin only |
| `/dashboard/user` | User booking history | Logged-in users |
| `/dashboard/admin` | Analytics dashboard | Admin only |
| `/contact` | Contact/enquiry form | Everyone |
| `/contact/enquiries` | View all enquiries | Admin only |

---

## How Authentication Works

1. User fills in the register form
2. Password is hashed using **bcrypt** (never stored as plain text)
3. On login, bcrypt compares the entered password against the stored hash
4. On success, user info is saved in an **express-session** (stored server-side)
5. Middleware checks `req.session.user` on every protected route

---

## How MVC Works in This Project

- **Model** — `models/` folder — defines the MongoDB schema and interacts with the database
- **View** — `views/` folder — EJS templates that display data to the user
- **Controller** — `controllers/` folder — receives requests, calls the model, sends data to the view
- **Routes** — connect URLs to controllers, with middleware applied as needed

---

## How Booking Validation Works

1. User selects number of tickets and clicks "Book Now"
2. Controller checks: `requestedTickets <= event.availableTickets`
3. If enough tickets: booking is created, `event.availableTickets` is reduced
4. If not enough tickets: error flash message is shown
5. On cancellation: tickets are returned to the event's available count
