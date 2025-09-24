import { useState, useEffect } from "react";
import API from "../../lib/api";

export default function BudgetAlerts({ month }) {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    try {
      const budgets = await API.get(`/budgets/${month}`);
      const expenses = await API.get("/expenses");
      const monthExpenses = expenses.data.filter(
        (e) => e.date.slice(0, 7) === month // YYYY-MM
      );

      const computed = budgets.data.map((b) => {
        const spent = monthExpenses
          .filter((e) => e.category === b.category)
          .reduce((acc, e) => acc + e.amount, 0);
        const percent = (spent / b.limit) * 100;

        return {
          ...b,
          spent,
          percent,
          warning: percent >= 80,
          exceeded: percent >= 100,
        };
      });

      setAlerts(computed);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [month]);

  return (
    <div className="space-y-2">
      {alerts.map((a) => (
        <div
          key={a.category}
          className={`p-3 rounded-lg text-white ${
            a.exceeded
              ? "bg-red-600"
              : a.warning
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {a.category}: Spent ₹{a.spent} / ₹{a.limit} ({a.percent.toFixed(1)}%)
        </div>
      ))}
    </div>
  );
}
