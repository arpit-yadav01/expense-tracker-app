const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: { type: String, required: true }, // YYYY-MM
  category: { type: String, required: true },
  limit: { type: Number, required: true }
}, { timestamps: true });

BudgetSchema.index({ userId: 1, month: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('Budget', BudgetSchema);
