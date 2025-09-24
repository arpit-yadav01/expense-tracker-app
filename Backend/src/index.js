// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const morgan = require('morgan');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const expenseRoutes = require('./routes/expenses');
// const budgetRoutes = require('./routes/budgets');

// const app = express();

// // middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));

// // routes
// app.use('/api/auth', authRoutes);
// app.use('/api/expenses', expenseRoutes);
// app.use('/api/budgets', budgetRoutes);

// const PORT = process.env.PORT || 8080;
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
//   })
//   .catch(err => console.error(err));
  

// Backend/src/index.js
require('dotenv').config(); // loads .env in local dev only
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// route imports (make sure these paths are correct)
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const budgetRoutes = require('./routes/budgets');

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// --- Friendly root (health-check) ---
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// --- API routes ---
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets', budgetRoutes);

// --- 404 for unknown routes ---
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

// --- Central error handler ---
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// --- Start server after DB connection ---
const PORT = parseInt(process.env.PORT, 10) || 8080;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('ERROR: MONGO_URI is not set. Set it in environment variables.');
  process.exit(1);
}

mongoose.set('strictQuery', false); // optional: avoid deprecation warnings
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    const server = app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });

    // Graceful shutdown
    const shutDown = () => {
      console.log('Shutting down server...');
      server.close(() => {
        mongoose.disconnect().then(() => {
          console.log('Mongo disconnected. Exiting now.');
          process.exit(0);
        });
      });
    };

    process.on('SIGINT', shutDown);
    process.on('SIGTERM', shutDown);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
