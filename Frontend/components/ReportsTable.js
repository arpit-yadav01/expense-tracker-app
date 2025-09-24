import React from "react";

export default function ReportsTable({ reports }) {
  if (!reports || reports.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 my-6 text-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Monthly Reports</h2>
        <p className="text-gray-500">No reports available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 my-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Reports</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              {Object.keys(reports[0]).map((key) => (
                <th key={key} className="px-4 py-2 border text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-all">
                {Object.values(report).map((val, i) => (
                  <td key={i} className="px-4 py-2 border">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
