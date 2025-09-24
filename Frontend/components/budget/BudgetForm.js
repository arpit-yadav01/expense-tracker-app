import { useState } from "react";
import API from "../../lib/api";

export default function BudgetForm({ month, onSaved }) {
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  const saveBudget = async () => {
    if (!category || !limit) return alert("Enter category and limit");
    try {
      await API.post("/budgets", { month, category, limit: Number(limit) });
      setCategory("");
      setLimit("");
      onSaved(); // refresh alerts
    } catch (err) {
      console.error(err);
      alert("Failed to save budget");
    }
  };

  return (
    <div className="p-4 bg-indigo-50 rounded-xl shadow-md space-y-3">
      <h2 className="text-lg font-bold">Set Monthly Budget</h2>
      <input
        className="input w-full"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        className="input w-full"
        type="number"
        placeholder="Limit (₹)"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />
      <button
        onClick={saveBudget}
        className="btn bg-indigo-600 text-white w-full hover:bg-indigo-700 transition-all"
      >
        Save Budget
      </button>
    </div>
  );
}
