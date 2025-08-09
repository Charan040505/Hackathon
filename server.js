const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));        // Auth routes
app.use('/api/items', require('./routes/itemRoutes'));  
const supplierRoutes = require('./routes/supplierRoutes');
app.use('/api/suppliers', supplierRoutes);
     // Item CRUD routes
const logRoutes = require('./routes/logRoutes');
app.use('/api/logs', logRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
