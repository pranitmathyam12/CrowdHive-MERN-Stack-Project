const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Import routes
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const profileImageUpload = require('./routes/profileImageUpload');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true // Allow credentials if needed
}));

// Handle preflight requests
app.options('*', cors());

// Parse incoming JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users/profile-image', profileImageUpload); // Unique route

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Server error:", err.message);
    res.status(500).json({ error: err.message });
});

// Define the PORT and start the server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle port conflict or other server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please use a different port.`);
        process.exit(1);
    } else {
        console.error("Server error:", err);
    }
});