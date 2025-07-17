require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const notFound = require('./middlewares/notFound');

// ====== নতুন যোগ ======
// Custom logger middleware যোগ করা হলো ধাপ ৫ এর জন্য
const logger = require('./middlewares/logger');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// ====== নতুন যোগ ======
// ধাপ ৫: Custom Logger Middleware
app.use(logger);

app.use('/api/users', userRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/message', (req, res) => {
  res.json({ message: '✅ API connected from Express to React!' });
});

// ====== তোমার কোডে 'notFound' এর জায়গা বদলানো হলো ======
// 404 Middleware গুলো সব রাউটসের পরে বসানো উচিৎ, তাই নিচে সরিয়ে নেওয়া হলো
app.use(notFound);

// ====== server start করার ফাংশন ======
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
