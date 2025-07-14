// Load environment variables
require('dotenv').config();// এই হালায় উপরে থাকে 
const cors = require('cors');

// External imports
const express = require('express');
const connectDB = require('./config/db');

// App initialization
const app = express();
app.use(cors()); // এই জাগায় ই হবে  অন্য origin (যেমন React) থেকে call করার অনুমতি

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.get('/api/message', (req, res) => {
  res.json({ message: '✅ API connected from Express to React!' });
});

// Connect to DB and start server
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
