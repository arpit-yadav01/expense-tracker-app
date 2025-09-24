const express = require('express');
const Budget = require('../models/Budget');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { month, category, limit } = req.body;
  try {
    const budget = await Budget.findOneAndUpdate(
      { userId: req.user._id, month, category },
      { limit },
      { upsert: true, new: true }
    );
    res.json(budget);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:month', auth, async (req, res) => {
  const budgets = await Budget.find({ userId: req.user._id, month: req.params.month });
  res.json(budgets);
});

module.exports = router;
