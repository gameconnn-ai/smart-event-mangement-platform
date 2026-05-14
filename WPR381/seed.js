// ============================================================
// SEED SCRIPT
// Run this ONCE to populate the database with demo data.
// Command: node seed.js
// ============================================================

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./models/User');
const Event = require('./models/Event');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data first (so this script can be run repeatedly)
    await User.deleteMany({});
    await Event.deleteMany({});
    console.log('Cleared existing data');

    // ─── Create Users ────────────────────────────────────────

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@smartevents.com',
      password: adminPassword,
      role: 'admin'
    });

    const regularUser = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: userPassword,
      role: 'user'
    });

    console.log('Created users:');
    console.log('  Admin: admin@smartevents.com / admin123');
    console.log('  User:  jane@example.com / user123');

    // ─── Create Events ────────────────────────────────────────

    await Event.create([
      {
        title: 'Tech Summit 2026',
        description: 'A major conference bringing together technology leaders, developers, and entrepreneurs from across South Africa to discuss the future of AI, cloud computing, and digital transformation.',
        category: 'Conference',
        date: new Date('2026-07-15T09:00:00'),
        location: 'Sandton Convention Centre, Johannesburg',
        price: 850,
        totalTickets: 500,
        availableTickets: 423,
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60',
        createdBy: admin._id
      },
      {
        title: 'Cape Town Jazz Festival',
        description: 'South Africa\'s premier jazz event featuring world-class local and international artists. Two days of incredible music, food, and culture at the Cape Town International Convention Centre.',
        category: 'Festival',
        date: new Date('2026-08-22T18:00:00'),
        location: 'CTICC, Cape Town',
        price: 450,
        totalTickets: 2000,
        availableTickets: 1450,
        imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60',
        createdBy: admin._id
      },
      {
        title: 'Web Development Bootcamp',
        description: 'An intensive 2-day hands-on workshop covering HTML, CSS, JavaScript, Node.js and MongoDB. Perfect for beginners and intermediate developers looking to level up their skills.',
        category: 'Workshop',
        date: new Date('2026-06-10T08:30:00'),
        location: 'Belgium Campus, Pretoria',
        price: 200,
        totalTickets: 50,
        availableTickets: 12,
        imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60',
        createdBy: admin._id
      },
      {
        title: 'Durban Corporate Gala Dinner',
        description: 'An exclusive black-tie event for business leaders and executives. Enjoy fine dining, keynote speeches, and premium networking opportunities.',
        category: 'Private',
        date: new Date('2026-09-05T19:00:00'),
        location: 'Elangeni Hotel, Durban',
        price: 1200,
        totalTickets: 150,
        availableTickets: 150,
        imageUrl: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&auto=format&fit=crop&q=60',
        createdBy: admin._id
      },
      {
        title: 'Digital Marketing Masterclass',
        description: 'Learn modern digital marketing strategies including SEO, social media marketing, email campaigns, and analytics. Taught by industry professionals with real-world case studies.',
        category: 'Workshop',
        date: new Date('2026-06-28T09:00:00'),
        location: 'Rosebank College, Johannesburg',
        price: 350,
        totalTickets: 80,
        availableTickets: 0, // Sold out example
        createdBy: admin._id
      }
    ]);

    console.log('Created 5 sample events (including 1 sold-out event)');
    console.log('\nSeeding complete! You can now run the app with: npm run dev');

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase();
