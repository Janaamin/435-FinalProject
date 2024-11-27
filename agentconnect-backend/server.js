const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors()); // Allow all origins (for development)

// Middleware
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to AgentConnect API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
