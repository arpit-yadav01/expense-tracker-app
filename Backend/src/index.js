const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const budgetRoutes = require('./routes/budgets');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets', budgetRoutes);

const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  })
  .catch(err => console.error(err));
