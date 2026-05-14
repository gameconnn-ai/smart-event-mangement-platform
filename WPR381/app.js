// Load environment variables from .env file first
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const eventController = require('./controllers/eventController');

// Import error handling middleware
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Create the Express app
const app = express();

// ============================================================
// DATABASE CONNECTION
// Connect to MongoDB using the URI from the .env file
// ============================================================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Stop the server if DB connection fails
  });

// ============================================================
// TEMPLATE ENGINE SETUP
// Tell Express to use EJS for rendering HTML pages
// ============================================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ============================================================
// MIDDLEWARE STACK
// Middleware runs on every request, in the order listed here
// ============================================================

// Serve static files (CSS, images, JS) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data from HTML forms (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Parse JSON data (for any API-style requests)
app.use(express.json());

// Allow HTML forms to send PUT and DELETE requests
// HTML forms only support GET and POST natively
// We add ?_method=PUT or ?_method=DELETE to the form action URL
app.use(methodOverride('_method'));

// Session configuration
// Sessions store user login info on the server between requests
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallbackSecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // Session lasts 24 hours
  }
}));

// Flash messages - one-time messages shown after redirects
// e.g. "Booking confirmed!" shows once after you book
app.use(flash());

// Make session user available in ALL EJS templates automatically
// So every view can check: if (user) show logout button
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// ============================================================
// ROUTES
// Each route group handles a specific section of the app
// ============================================================

// Home page - shows event listing
app.get('/', eventController.getAllEvents);

// Authentication routes (/auth/login, /auth/register, etc.)
app.use('/auth', authRoutes);

// Event management routes (/events/create, /events/manage, etc.)
app.use('/events', eventRoutes);

// Booking and dashboard routes (/dashboard/user, /dashboard/admin, etc.)
app.use('/dashboard', bookingRoutes);

// Contact and enquiry routes (/contact, /contact/enquiries, etc.)
app.use('/contact', contactRoutes);

// ============================================================
// ERROR HANDLERS (must come AFTER all routes)
// ============================================================

// Handle 404 - page not found
app.use(notFound);

// Handle all other errors
app.use(errorHandler);

// ============================================================
// START THE SERVER
// ============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});
