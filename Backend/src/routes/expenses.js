const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { amount, category, date, paymentMethod, notes } = req.body;
  const expense = new Expense({
    userId: req.user._id,
    amount,
    category,
    date,
    paymentMethod,
    notes
  });
  await expense.save();
  res.json(expense);
});

router.get('/', auth, async (req, res) => {
  const { category, from, to, paymentMethod, search } = req.query;
  let query = { userId: req.user._id };
  if (category) query.category = category;
  if (paymentMethod) query.paymentMethod = paymentMethod;
  if (from && to) query.date = { $gte: new Date(from), $lte: new Date(to) };
  if (search) query.notes = { $regex: search, $options: 'i' };

  const expenses = await Expense.find(query).sort({ date: -1 });
  res.json(expenses);
});

router.put('/:id', auth, async (req, res) => {
  const updated = await Expense.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
  await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  res.json({ message: 'Deleted' });
});

module.exports = router;
