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

// Enable CORS with specific frontend origin and credentials support
app.use(cors({
  origin: 'https://imd-khaki.vercel.app',  // Your frontend URL
  credentials: true
}));

// Handle preflight requests explicitly (optional but helpful)
app.options('*', cors({
  origin: 'https://imd-khaki.vercel.app',
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));        // Auth routes
app.use('/api/items', require('./routes/itemRoutes'));  
const supplierRoutes = require('./routes/supplierRoutes');
app.use('/api/suppliers', supplierRoutes);
const logRoutes = require('./routes/logRoutes');
app.use('/api/logs', logRoutes);

// Simple homepage route to confirm backend is running
app.get('/', (req, res) => {
  res.send('Inventory Management Backend is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
