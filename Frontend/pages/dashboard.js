// // frontend/pages/dashboard.js
// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import API from "../lib/api";
// import { useRouter } from "next/router";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import BudgetForm from "../components/budget/BudgetForm";
// import BudgetAlerts from "../components/budget/BudgetAlerts";

// export default function Dashboard() {
//   const router = useRouter();
//   const [expenses, setExpenses] = useState([]);
//   const [filteredExpenses, setFilteredExpenses] = useState([]);
//   const [summary, setSummary] = useState({ total: 0, topCategory: null, topPayments: [] });
//   const [filters, setFilters] = useState({ category: "", paymentMethod: "", from: "", to: "", search: "" });
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({});
//   const currentMonth = new Date().toISOString().slice(0, 7);
//   const [refresh, setRefresh] = useState(0);

//   // Fetch expenses
//   const fetchExpenses = async () => {
//     try {
//       const res = await API.get("/expenses");
//       setExpenses(res.data);
//       setFilteredExpenses(res.data);
//       calculateSummary(res.data);
//     } catch (err) {
//       console.error(err);
//       if (err.response?.status === 401) router.push("/login");
//     }
//   };

//   const calculateSummary = (data) => {
//     const currentMonthExpenses = data.filter((e) => e.date.slice(0, 7) === currentMonth);
//     const total = currentMonthExpenses.reduce((acc, e) => acc + e.amount, 0);

//     const categoryMap = {};
//     const paymentMap = {};
//     currentMonthExpenses.forEach((e) => {
//       categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
//       paymentMap[e.paymentMethod] = (paymentMap[e.paymentMethod] || 0) + 1;
//     });

//     const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];
//     const topPayments = Object.entries(paymentMap).sort((a, b) => b[1] - a[1]).slice(0, 3).map((p) => p[0]);

//     setSummary({
//       total,
//       topCategory: topCategory ? topCategory[0] : "N/A",
//       topPayments,
//     });
//   };

//   // Filter handlers
//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const applyFilters = () => {
//     let data = [...expenses];
//     if (filters.category) data = data.filter((e) => e.category === filters.category);
//     if (filters.paymentMethod) data = data.filter((e) => e.paymentMethod === filters.paymentMethod);
//     if (filters.from && filters.to) data = data.filter((e) => new Date(e.date) >= new Date(filters.from) && new Date(e.date) <= new Date(filters.to));
//     if (filters.search) data = data.filter((e) => e.notes.toLowerCase().includes(filters.search.toLowerCase()));
//     setFilteredExpenses(data);
//     calculateSummary(data);
//   };

//   useEffect(() => { fetchExpenses(); }, []);
//   useEffect(() => { applyFilters(); }, [filters, expenses]);

//   // Edit/Delete
//   const startEdit = (exp) => setEditingId(exp._id) || setEditForm({ ...exp, amount: exp.amount.toString(), date: exp.date.slice(0, 10) });
//   const saveEdit = async (id) => {
//     try {
//       await API.put(`/expenses/${id}`, { ...editForm, amount: Number(editForm.amount) });
//       setEditingId(null);
//       setEditForm({});
//       fetchExpenses();
//     } catch (err) { console.error(err); alert("Failed to update expense"); }
//   };
//   const deleteExpense = async (id) => {
//     if (!confirm("Are you sure you want to delete this expense?")) return;
//     try { await API.delete(`/expenses/${id}`); fetchExpenses(); } catch (err) { console.error(err); alert("Failed to delete expense"); }
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="max-w-6xl mx-auto p-6 space-y-6">
//         {/* Filter + Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="p-4 bg-indigo-50 rounded-xl shadow-lg">
//             <h2 className="font-bold text-lg mb-2">Total</h2>
//             <p className="text-2xl font-bold">₹{summary.total}</p>
//           </div>
//           <div className="p-4 bg-green-50 rounded-xl shadow-lg">
//             <h2 className="font-bold text-lg mb-2">Top Category</h2>
//             <p className="text-xl">{summary.topCategory}</p>
//           </div>
//           <div className="p-4 bg-yellow-50 rounded-xl shadow-lg">
//             <h2 className="font-bold text-lg mb-2">Top Payments</h2>
//             <ul className="list-disc pl-5">
//               {summary.topPayments.map((p, i) => <li key={i}>{p}</li>)}
//             </ul>
//           </div>
//         </div>

//         {/* Budget Form & Alerts */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <BudgetForm month={currentMonth} onSaved={() => setRefresh((r) => r + 1)} />
//           <BudgetAlerts key={refresh} month={currentMonth} />
//         </div>

//         {/* Filters */}
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//           <input placeholder="Search notes..." value={filters.search} onChange={(e) => handleFilterChange("search", e.target.value)} className="input w-full col-span-2" />
//           <input type="date" value={filters.from} onChange={(e) => handleFilterChange("from", e.target.value)} className="input w-full" />
//           <input type="date" value={filters.to} onChange={(e) => handleFilterChange("to", e.target.value)} className="input w-full" />
//           <select value={filters.category} onChange={(e) => handleFilterChange("category", e.target.value)} className="input w-full">
//             <option value="">All Categories</option>
//             {[...new Set(expenses.map((e) => e.category))].map((c, i) => <option key={i} value={c}>{c}</option>)}
//           </select>
//           <select value={filters.paymentMethod} onChange={(e) => handleFilterChange("paymentMethod", e.target.value)} className="input w-full">
//             <option value="">All Payments</option>
//             {[...new Set(expenses.map((e) => e.paymentMethod))].map((p, i) => <option key={i} value={p}>{p}</option>)}
//           </select>
//         </div>

//         {/* Expenses Table */}
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full border border-gray-200 rounded-lg">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="px-4 py-2 border">Date</th>
//                 <th className="px-4 py-2 border">Category</th>
//                 <th className="px-4 py-2 border">Payment</th>
//                 <th className="px-4 py-2 border">Amount</th>
//                 <th className="px-4 py-2 border">Notes</th>
//                 <th className="px-4 py-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredExpenses.map((e) => (
//                 <tr key={e._id} className="hover:bg-gray-50 transition-all">
//                   <td className="px-4 py-2 border">{new Date(e.date).toLocaleDateString()}</td>
//                   <td className="px-4 py-2 border">{editingId === e._id ? <input value={editForm.category} onChange={(ev) => setEditForm({ ...editForm, category: ev.target.value })} className="input w-full" /> : e.category}</td>
//                   <td className="px-4 py-2 border">{editingId === e._id ? <input value={editForm.paymentMethod} onChange={(ev) => setEditForm({ ...editForm, paymentMethod: ev.target.value })} className="input w-full" /> : e.paymentMethod}</td>
//                   <td className="px-4 py-2 border">{editingId === e._id ? <input value={editForm.amount} onChange={(ev) => setEditForm({ ...editForm, amount: ev.target.value })} className="input w-full" /> : `₹${e.amount}`}</td>
//                   <td className="px-4 py-2 border">{editingId === e._id ? <input value={editForm.notes} onChange={(ev) => setEditForm({ ...editForm, notes: ev.target.value })} className="input w-full" /> : e.notes}</td>
//                   <td className="px-4 py-2 border space-x-2">
//                     {editingId === e._id ? (
//                       <>
//                         <button onClick={() => saveEdit(e._id)} className="btn bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm">Save</button>
//                         <button onClick={() => setEditingId(null)} className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm">Cancel</button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={() => startEdit(e)} className="btn bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm flex items-center gap-1"><FaEdit /></button>
//                         <button onClick={() => deleteExpense(e._id)} className="btn bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm flex items-center gap-1"><FaTrash /></button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </>
//   );
// }

// frontend/pages/dashboard.js
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar.js";
import API from "../lib/api";
import { useRouter } from "next/router";
import Suggestions from "../components/Suggestions";
import ReportsTable from "../components/ReportsTable";

import { 
  FaEdit, 
  FaTrash, 
  FaSearch, 
  FaFilter, 
  FaChartPie, 
  FaCalendarAlt,
  FaCreditCard,
  FaRupeeSign,
  FaSave,
  FaTimes,
  FaPlus
} from "react-icons/fa";
import BudgetForm from "../components/budget/BudgetForm";
import BudgetAlerts from "../components/budget/BudgetAlerts";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.02, y: -2 }}
    className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${color}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
    <div className="relative p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium opacity-80 uppercase tracking-wide">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-sm opacity-70 mt-1">{subtitle}</p>}
        </div>
        <Icon className="text-2xl opacity-60" />
      </div>
    </div>
  </motion.div>
);

const FilterSection = ({ filters, onFilterChange, expenses, isVisible, onToggle }) => (
  <motion.div
    initial={false}
    animate={{ height: isVisible ? "auto" : 0, opacity: isVisible ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    className="overflow-hidden bg-white rounded-xl shadow-lg"
  >
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search in notes..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="relative">
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="date"
            value={filters.from}
            onChange={(e) => onFilterChange("from", e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="relative">
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="date"
            value={filters.to}
            onChange={(e) => onFilterChange("to", e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        >
          <option value="">All Categories</option>
          {[...new Set(expenses.map((e) => e.category))].map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={filters.paymentMethod}
          onChange={(e) => onFilterChange("paymentMethod", e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        >
          <option value="">All Payment Methods</option>
          {[...new Set(expenses.map((e) => e.paymentMethod))].map((method, index) => (
            <option key={index} value={method}>{method}</option>
          ))}
        </select>
      </div>
    </div>
  </motion.div>
);

const ExpenseRow = ({ expense, isEditing, editForm, onEdit, onSave, onCancel, onDelete, onFormChange }) => (
  <motion.tr
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    whileHover={{ backgroundColor: "#f8fafc" }}
    className="border-b border-gray-100 transition-colors"
  >
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <FaCalendarAlt className="text-gray-400 mr-2" />
        {new Date(expense.date).toLocaleDateString('en-IN')}
      </div>
    </td>
    
    <td className="px-6 py-4">
      {isEditing ? (
        <input
          value={editForm.category}
          onChange={(e) => onFormChange("category", e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      ) : (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
          {expense.category}
        </span>
      )}
    </td>

    <td className="px-6 py-4">
      {isEditing ? (
        <input
          value={editForm.paymentMethod}
          onChange={(e) => onFormChange("paymentMethod", e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      ) : (
        <div className="flex items-center">
          <FaCreditCard className="text-gray-400 mr-2" />
          {expense.paymentMethod}
        </div>
      )}
    </td>

    <td className="px-6 py-4 whitespace-nowrap">
      {isEditing ? (
        <input
          type="number"
          value={editForm.amount}
          onChange={(e) => onFormChange("amount", e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      ) : (
        <div className="flex items-center font-semibold text-gray-900">
          <FaRupeeSign className="text-green-500 mr-1" />
          {expense.amount.toLocaleString('en-IN')}
        </div>
      )}
    </td>

    <td className="px-6 py-4 max-w-xs">
      {isEditing ? (
        <textarea
          value={editForm.notes}
          onChange={(e) => onFormChange("notes", e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          rows="2"
        />
      ) : (
        <p className="text-gray-600 truncate" title={expense.notes}>
          {expense.notes}
        </p>
      )}
    </td>

    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center space-x-2">
        {isEditing ? (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSave}
              className="flex items-center px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm transition-colors"
            >
              <FaSave className="mr-1" />
              Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCancel}
              className="flex items-center px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
            >
              <FaTimes className="mr-1" />
              Cancel
            </motion.button>
          </>
        ) : (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEdit}
              className="flex items-center px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm transition-colors"
            >
              <FaEdit />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDelete}
              className="flex items-center px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-colors"
            >
              <FaTrash />
            </motion.button>
          </>
        )}
      </div>
    </td>
  </motion.tr>
);


export default function Dashboard() {
  // ...existing dashboard state and logic...
  const router = useRouter();
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [summary, setSummary] = useState({ total: 0, topCategory: null, topPayments: [] });
  const [filters, setFilters] = useState({ 
    category: "", 
    paymentMethod: "", 
    from: "", 
    to: "", 
    search: "" 
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [refresh, setRefresh] = useState(0);

  // New: Monthly reports state
  const [reports, setReports] = useState([]);

  // Fetch expenses with loading state
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await API.get("/expenses");
      setExpenses(res.data);
      setFilteredExpenses(res.data);
      calculateSummary(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  // Fetch monthly reports from Flask service
  useEffect(() => {
    fetch("http://127.0.0.1:5001/reports/USER_ID_HERE") // TODO: replace USER_ID_HERE with real user ID or token
      .then(async (res) => {
        if (!res.ok) {
          // Try to parse JSON error, else fallback to text
          let errorText = await res.text();
          try {
            const errorJson = JSON.parse(errorText);
            throw new Error(errorJson.error || errorJson.detail || "Failed to fetch reports");
          } catch {
            throw new Error("Reports endpoint not found (404)");
          }
        }
        return res.json();
      })
      .then((data) => setReports(data))
      .catch((err) => {
        console.error("Failed to load reports:", err);
      });
  }, []);

  const calculateSummary = (data) => {
    const currentMonthExpenses = data.filter((e) => 
      e.date.slice(0, 7) === currentMonth
    );
    
    const total = currentMonthExpenses.reduce((acc, e) => acc + e.amount, 0);

    const categoryMap = {};
    const paymentMap = {};
    
    currentMonthExpenses.forEach((e) => {
      categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
      paymentMap[e.paymentMethod] = (paymentMap[e.paymentMethod] || 0) + 1;
    });

    const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];
    const topPayments = Object.entries(paymentMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map((p) => p[0]);

    setSummary({
      total,
      topCategory: topCategory ? topCategory[0] : "No expenses yet",
      topPayments,
    });
  };

  // ...existing filter, edit, and delete logic...
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    let data = [...expenses];
    
    if (filters.category) {
      data = data.filter((e) => e.category === filters.category);
    }
    if (filters.paymentMethod) {
      data = data.filter((e) => e.paymentMethod === filters.paymentMethod);
    }
    if (filters.from && filters.to) {
      data = data.filter((e) => 
        new Date(e.date) >= new Date(filters.from) && 
        new Date(e.date) <= new Date(filters.to)
      );
    }
    if (filters.search) {
      data = data.filter((e) => 
        e.notes.toLowerCase().includes(filters.search.toLowerCase()) ||
        e.category.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    setFilteredExpenses(data);
    calculateSummary(data);
  };

  const clearFilters = () => {
    setFilters({ category: "", paymentMethod: "", from: "", to: "", search: "" });
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, expenses]);

  const startEdit = (expense) => {
    setEditingId(expense._id);
    setEditForm({
      ...expense,
      amount: expense.amount.toString(),
      date: expense.date.slice(0, 10)
    });
  };

  const saveEdit = async (id) => {
    try {
      await API.put(`/expenses/${id}`, {
        ...editForm,
        amount: Number(editForm.amount)
      });
      setEditingId(null);
      setEditForm({});
      fetchExpenses();
    } catch (err) {
      console.error(err);
      alert("Failed to update expense");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const deleteExpense = async (id) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;
    
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error(err);
      alert("Failed to delete expense");
    }
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto p-6 space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Expense Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Track and manage your expenses efficiently
            </p>
          </motion.div>

          {/* Summary Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total This Month"
              value={`₹${summary.total.toLocaleString('en-IN')}`}
              icon={FaRupeeSign}
              color="bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
              subtitle={`${new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' })}`}
            />
            <StatCard
              title="Top Category"
              value={summary.topCategory}
              icon={FaChartPie}
              color="bg-gradient-to-br from-green-500 to-emerald-600 text-white"
            />
            <StatCard
              title="Payment Methods"
              value={`${summary.topPayments.length} Active`}
              icon={FaCreditCard}
              color="bg-gradient-to-br from-orange-500 to-red-600 text-white"
              subtitle={summary.topPayments.slice(0, 2).join(", ")}
            />
          </motion.div>

          {/* Budget Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaPlus className="mr-2 text-indigo-600" />
                  Set Budget
                </h2>
                <BudgetForm 
                  month={currentMonth} 
                  onSaved={() => setRefresh((r) => r + 1)} 
                />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Budget Alerts
                </h2>
                <BudgetAlerts key={refresh} month={currentMonth} />
              </div>
            </div>
          </motion.div>

          {/* Filters Toggle */}
          <motion.div variants={itemVariants} className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Expenses ({filteredExpenses.length})
            </h2>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                <FaFilter className="mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </motion.button>
              {(Object.values(filters).some(v => v)) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                >
                  Clear Filters
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Filters */}
          <FilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
            expenses={expenses}
            isVisible={showFilters}
          />

          {/* Suggestions Component */}
          <Suggestions expenses={expenses} />

          {/* Monthly Reports Table (NEW) */}
          <ReportsTable reports={reports} />

          {/* Expenses Table */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {filteredExpenses.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-gray-400 text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No expenses found
                </h3>
                <p className="text-gray-500">
                  {Object.values(filters).some(v => v) 
                    ? "Try adjusting your filters" 
                    : "Start by adding your first expense"
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Notes
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {filteredExpenses.map((expense) => (
                        <ExpenseRow
                          key={expense._id}
                          expense={expense}
                          isEditing={editingId === expense._id}
                          editForm={editForm}
                          onEdit={() => startEdit(expense)}
                          onSave={() => saveEdit(expense._id)}
                          onCancel={cancelEdit}
                          onDelete={() => deleteExpense(expense._id)}
                          onFormChange={handleEditFormChange}
                        />
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </motion.main>
      </div>
    </>
  );
}