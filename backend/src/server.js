const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const eventsRoutes = require('./routes/events');
const contactsRoutes = require('./routes/contacts');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', eventsRoutes);
app.use('/api/contacts', contactsRoutes);

// Test route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});