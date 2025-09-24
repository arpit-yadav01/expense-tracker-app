// frontend/components/ReportsTable.js
import React from "react";

export default function ReportsTable({ reports }) {
  if (!reports || reports.length === 0) {
    return <p className="text-gray-500">No reports found.</p>;
  }

  return (
    <div className="mt-6 bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-bold mb-4">📊 Monthly Reports (Last 3 Months)</h2>
      <table className="w-full border border-gray-200 rounded">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Month</th>
            <th className="p-2">Total Spent</th>
            <th className="p-2">Top Category</th>
            <th className="p-2">Overbudget Categories</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.month} className="border-t">
              <td className="p-2">{r.month}</td>
              <td className="p-2">₹{r.total_spent}</td>
              <td className="p-2">{r.top_category}</td>
              <td className="p-2">{r.overbudget || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
