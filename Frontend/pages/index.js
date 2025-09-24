

// // import { useState, useEffect } from 'react';
// // import Navbar from '../components/Navbar';
// // import API from '../lib/api';
// // import { useRouter } from 'next/router';
// // import { useUser } from '../context/UserContext';
// // import { FaEdit, FaTrash } from 'react-icons/fa';

// // export default function Home() {
// //   const router = useRouter();
// //   const { user } = useUser();
// //   const [form, setForm] = useState({ amount: '', category: '', date: '', paymentMethod: '', notes: '' });
// //   const [expenses, setExpenses] = useState([]);
// //   const [editingId, setEditingId] = useState(null);
// //   const [editForm, setEditForm] = useState({});

// //   // Pagination state
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const expensesPerPage = 5;

// //   const fetchExpenses = async () => {
// //     try {
// //       const res = await API.get('/expenses');
// //       setExpenses(res.data);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   useEffect(() => {
// //     const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
// //     if (!token) {
// //       router.push('/');
// //       return;
// //     }
// //     fetchExpenses();
// //   }, []);

// //   const addExpense = async () => {
// //     try {
// //       await API.post('/expenses', { ...form, amount: Number(form.amount) });
// //       setForm({ amount: '', category: '', date: '', paymentMethod: '', notes: '' });
// //       fetchExpenses();
// //     } catch (err) {
// //       console.error(err);
// //       alert('Failed to add expense');
// //     }
// //   };

// //   const startEdit = (exp) => {
// //     setEditingId(exp._id);
// //     setEditForm({ ...exp, amount: exp.amount.toString(), date: exp.date.slice(0, 10) });
// //   };

// //   const saveEdit = async (id) => {
// //     try {
// //       await API.put(`/expenses/${id}`, { ...editForm, amount: Number(editForm.amount) });
// //       setEditingId(null);
// //       setEditForm({});
// //       fetchExpenses();
// //     } catch (err) {
// //       console.error(err);
// //       alert('Failed to update expense');
// //     }
// //   };

// //   const deleteExpense = async (id) => {
// //     if (!confirm('Are you sure you want to delete this expense?')) return;
// //     try {
// //       await API.delete(`/expenses/${id}`);
// //       fetchExpenses();
// //     } catch (err) {
// //       console.error(err);
// //       alert('Failed to delete expense');
// //     }
// //   };

// //   // Pagination calculations
// //   const indexOfLast = currentPage * expensesPerPage;
// //   const indexOfFirst = indexOfLast - expensesPerPage;
// //   const currentExpenses = expenses.slice(indexOfFirst, indexOfLast);
// //   const totalPages = Math.ceil(expenses.length / expensesPerPage);

// //   return (
// //     <>
// //       <Navbar />
// //       <main className="max-w-6xl mx-auto mt-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
// //         {/* ADD EXPENSE */}
// //         <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 shadow-xl rounded-2xl p-6 hover:scale-105 transform transition-all">
// //           <h2 className="text-3xl font-bold mb-5 text-indigo-700">Add Expense</h2>
// //           <div className="space-y-4">
// //             <input className="input w-full" placeholder="Amount (₹)" value={form.amount}
// //               onChange={e => setForm({ ...form, amount: e.target.value })} />
// //             <input className="input w-full" placeholder="Category" value={form.category}
// //               onChange={e => setForm({ ...form, category: e.target.value })} />
// //             <input type="date" className="input w-full" value={form.date}
// //               onChange={e => setForm({ ...form, date: e.target.value })} />
// //             <input className="input w-full" placeholder="Payment Method" value={form.paymentMethod}
// //               onChange={e => setForm({ ...form, paymentMethod: e.target.value })} />
// //             <textarea className="input w-full" placeholder="Notes" value={form.notes}
// //               onChange={e => setForm({ ...form, notes: e.target.value })} />
// //             <div className="text-right">
// //               <button onClick={addExpense} className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all">
// //                 Add Expense
// //               </button>
// //             </div>
// //           </div>
// //         </section>

// //         {/* EXPENSES LIST */}
// //         <section className="bg-gradient-to-br from-green-50 via-white to-yellow-50 shadow-xl rounded-2xl p-6 hover:scale-105 transform transition-all">
// //           <h2 className="text-3xl font-bold mb-5 text-green-700">My Expenses</h2>
// //           <div className="space-y-4">
// //             {expenses.length === 0 && <div className="text-gray-500">No expenses yet.</div>}
// //             {currentExpenses.map(exp => (
// //               <div key={exp._id} className="flex flex-col md:flex-row justify-between items-start bg-white shadow-md p-4 rounded-xl hover:shadow-2xl transition-all group">
// //                 <div className="flex-1 space-y-1">
// //                   {editingId === exp._id ? (
// //                     <>
// //                       <input className="input w-full" value={editForm.amount}
// //                         onChange={e => setEditForm({ ...editForm, amount: e.target.value })} />
// //                       <input className="input w-full" value={editForm.category}
// //                         onChange={e => setEditForm({ ...editForm, category: e.target.value })} />
// //                       <input type="date" className="input w-full" value={editForm.date}
// //                         onChange={e => setEditForm({ ...editForm, date: e.target.value })} />
// //                       <input className="input w-full" value={editForm.paymentMethod}
// //                         onChange={e => setEditForm({ ...editForm, paymentMethod: e.target.value })} />
// //                       <textarea className="input w-full" value={editForm.notes}
// //                         onChange={e => setEditForm({ ...editForm, notes: e.target.value })} />
// //                     </>
// //                   ) : (
// //                     <>
// //                       <div className="text-2xl font-bold text-indigo-600">₹{exp.amount}</div>
// //                       <div className="flex flex-wrap gap-2 mt-1">
// //                         <span className="badge bg-purple-100 text-purple-700">{exp.category}</span>
// //                         <span className="badge bg-yellow-100 text-yellow-800">{exp.paymentMethod}</span>
// //                       </div>
// //                       <div className="text-gray-500 mt-1">{new Date(exp.date).toLocaleDateString()}</div>
// //                       <div className="text-gray-700 mt-1">{exp.notes}</div>
// //                     </>
// //                   )}
// //                 </div>

// //                 <div className="flex gap-2 mt-3 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
// //                   {editingId === exp._id ? (
// //                     <>
// //                       <button onClick={() => saveEdit(exp._id)}
// //                         className="btn bg-green-500 hover:bg-green-600 text-white p-1.5 text-sm rounded-lg flex items-center gap-1">
// //                         <FaEdit /> Save
// //                       </button>
// //                       <button onClick={() => setEditingId(null)}
// //                         className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 p-1.5 text-sm rounded-lg flex items-center gap-1">
// //                         Cancel
// //                       </button>
// //                     </>
// //                   ) : (
// //                     <>
// //                       <button onClick={() => startEdit(exp)}
// //                         className="btn bg-blue-500 hover:bg-blue-600 text-white p-1.5 text-sm rounded-lg flex items-center gap-1">
// //                         <FaEdit /> Edit
// //                       </button>
// //                       <button onClick={() => deleteExpense(exp._id)}
// //                         className="btn bg-red-500 hover:bg-red-600 text-white p-1.5 text-sm rounded-lg flex items-center gap-1">
// //                         <FaTrash /> Delete
// //                       </button>
// //                     </>
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Pagination */}
// //           {expenses.length > expensesPerPage && (
// //             <div className="flex justify-center gap-3 mt-6">
// //               {[...Array(totalPages)].map((_, i) => (
// //                 <button
// //                   key={i}
// //                   onClick={() => setCurrentPage(i + 1)}
// //                   className={`px-3 py-1 rounded-lg border ${
// //                     currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
// //                   }`}
// //                 >
// //                   {i + 1}
// //                 </button>
// //               ))}
// //             </div>
// //           )}
// //         </section>
// //       </main>
// //     </>
// //   );
// // }





// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Navbar from '../components/Navbar';
// import API from '../lib/api';
// import { useRouter } from 'next/router';
// import { useUser } from '../context/UserContext';
// import { 
//   FaEdit, 
//   FaTrash, 
//   FaPlus, 
//   FaRupeeSign, 
//   FaCalendarAlt, 
//   FaCreditCard,
//   FaTag,
//   FaStickyNote,
//   FaSave,
//   FaTimes,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEye
// } from 'react-icons/fa';

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.1
//     }
//   }
// };

// const itemVariants = {
//   hidden: { y: 30, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//       damping: 12
//     }
//   }
// };

// const cardVariants = {
//   hidden: { scale: 0.9, opacity: 0 },
//   visible: {
//     scale: 1,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//       damping: 15
//     }
//   },
//   hover: {
//     y: -8,
//     scale: 1.02,
//     transition: {
//       type: "spring",
//       stiffness: 300,
//       damping: 20
//     }
//   }
// };

// const ExpenseCard = ({ expense, isEditing, editForm, onEdit, onSave, onCancel, onDelete, onFormChange }) => (
//   <motion.div
//     layout
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     exit={{ opacity: 0, y: -20, scale: 0.9 }}
//     whileHover={{ y: -4, scale: 1.02 }}
//     className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
//   >
//     <div className="p-6">
//       {isEditing ? (
//         <EditForm 
//           editForm={editForm} 
//           onFormChange={onFormChange}
//           onSave={onSave}
//           onCancel={onCancel}
//         />
//       ) : (
//         <ViewMode 
//           expense={expense}
//           onEdit={onEdit}
//           onDelete={onDelete}
//         />
//       )}
//     </div>
//   </motion.div>
// );

// const ViewMode = ({ expense, onEdit, onDelete }) => (
//   <>
//     <div className="flex justify-between items-start mb-4">
//       <div className="flex items-center space-x-3">
//         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
//           <FaRupeeSign className="text-white text-lg" />
//         </div>
//         <div>
//           <h3 className="text-2xl font-bold text-gray-900">
//             ₹{expense.amount.toLocaleString('en-IN')}
//           </h3>
//           <p className="text-sm text-gray-500 flex items-center">
//             <FaCalendarAlt className="mr-1" />
//             {new Date(expense.date).toLocaleDateString('en-IN', {
//               day: 'numeric',
//               month: 'short',
//               year: 'numeric'
//             })}
//           </p>
//         </div>
//       </div>
      
//       <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={onEdit}
//           className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
//         >
//           <FaEdit />
//         </motion.button>
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={onDelete}
//           className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
//         >
//           <FaTrash />
//         </motion.button>
//       </div>
//     </div>

//     <div className="space-y-3">
//       <div className="flex flex-wrap gap-2">
//         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//           <FaTag className="mr-1" />
//           {expense.category}
//         </span>
//         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//           <FaCreditCard className="mr-1" />
//           {expense.paymentMethod}
//         </span>
//       </div>

//       {expense.notes && (
//         <div className="flex items-start space-x-2">
//           <FaStickyNote className="text-gray-400 mt-1 text-sm" />
//           <p className="text-gray-600 text-sm leading-relaxed">{expense.notes}</p>
//         </div>
//       )}
//     </div>
//   </>
// );

// const EditForm = ({ editForm, onFormChange, onSave, onCancel }) => (
//   <div className="space-y-4">
//     <div className="grid grid-cols-2 gap-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
//         <div className="relative">
//           <FaRupeeSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="number"
//             value={editForm.amount}
//             onChange={(e) => onFormChange('amount', e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//             placeholder="0"
//           />
//         </div>
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
//         <div className="relative">
//           <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="date"
//             value={editForm.date}
//             onChange={(e) => onFormChange('date', e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//           />
//         </div>
//       </div>
//     </div>

//     <div className="grid grid-cols-2 gap-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//         <div className="relative">
//           <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             value={editForm.category}
//             onChange={(e) => onFormChange('category', e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//             placeholder="Food, Transport, etc."
//           />
//         </div>
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
//         <div className="relative">
//           <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             value={editForm.paymentMethod}
//             onChange={(e) => onFormChange('paymentMethod', e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//             placeholder="Cash, Card, UPI"
//           />
//         </div>
//       </div>
//     </div>

//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
//       <div className="relative">
//         <FaStickyNote className="absolute left-3 top-3 text-gray-400" />
//         <textarea
//           value={editForm.notes}
//           onChange={(e) => onFormChange('notes', e.target.value)}
//           rows="3"
//           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
//           placeholder="Add any additional notes..."
//         />
//       </div>
//     </div>

//     <div className="flex justify-end space-x-3 pt-4">
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={onCancel}
//         className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
//       >
//         <FaTimes className="mr-2" />
//         Cancel
//       </motion.button>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={onSave}
//         className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
//       >
//         <FaSave className="mr-2" />
//         Save Changes
//       </motion.button>
//     </div>
//   </div>
// );

// const AddExpenseForm = ({ form, onFormChange, onSubmit, loading }) => (
//   <motion.div
//     variants={cardVariants}
//     whileHover="hover"
//     className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl shadow-xl overflow-hidden"
//   >
//     <div className="absolute inset-0 bg-black/10" />
//     <div className="relative p-8 text-white">
//       <div className="flex items-center mb-6">
//         <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
//           <FaPlus className="text-2xl" />
//         </div>
//         <h2 className="text-3xl font-bold">Add New Expense</h2>
//       </div>

//       <div className="space-y-5">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-2 text-white/90">Amount (₹)</label>
//             <div className="relative">
//               <FaRupeeSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
//               <input
//                 type="number"
//                 value={form.amount}
//                 onChange={(e) => onFormChange('amount', e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:border-white/50 transition-all"
//                 placeholder="Enter amount"
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-2 text-white/90">Date</label>
//             <div className="relative">
//               <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
//               <input
//                 type="date"
//                 value={form.date}
//                 onChange={(e) => onFormChange('date', e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:bg-white/30 focus:border-white/50 transition-all"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-2 text-white/90">Category</label>
//             <div className="relative">
//               <FaTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
//               <input
//                 value={form.category}
//                 onChange={(e) => onFormChange('category', e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:border-white/50 transition-all"
//                 placeholder="Food, Transport, etc."
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-2 text-white/90">Payment Method</label>
//             <div className="relative">
//               <FaCreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
//               <input
//                 value={form.paymentMethod}
//                 onChange={(e) => onFormChange('paymentMethod', e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:border-white/50 transition-all"
//                 placeholder="Cash, Card, UPI"
//               />
//             </div>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2 text-white/90">Notes (Optional)</label>
//           <div className="relative">
//             <FaStickyNote className="absolute left-4 top-4 text-white/70" />
//             <textarea
//               value={form.notes}
//               onChange={(e) => onFormChange('notes', e.target.value)}
//               rows="3"
//               className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:border-white/50 transition-all resize-none"
//               placeholder="Add any additional notes..."
//             />
//           </div>
//         </div>

//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={onSubmit}
//           disabled={loading}
//           className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-50"
//         >
//           {loading ? (
//             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//           ) : (
//             <FaPlus className="mr-2" />
//           )}
//           {loading ? 'Adding...' : 'Add Expense'}
//         </motion.button>
//       </div>
//     </div>
//   </motion.div>
// );

// const Pagination = ({ currentPage, totalPages, onPageChange }) => (
//   <div className="flex items-center justify-center space-x-2 mt-8">
//     <motion.button
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//       onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//       disabled={currentPage === 1}
//       className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//     >
//       <FaChevronLeft />
//     </motion.button>

//     {[...Array(totalPages)].map((_, i) => (
//       <motion.button
//         key={i}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => onPageChange(i + 1)}
//         className={`px-4 py-2 rounded-lg font-medium transition-all ${
//           currentPage === i + 1
//             ? 'bg-indigo-600 text-white shadow-lg'
//             : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
//         }`}
//       >
//         {i + 1}
//       </motion.button>
//     ))}

//     <motion.button
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//       onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//       disabled={currentPage === totalPages}
//       className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//     >
//       <FaChevronRight />
//     </motion.button>
//   </div>
// );

// const EmptyState = () => (
//   <motion.div
//     initial={{ opacity: 0, scale: 0.9 }}
//     animate={{ opacity: 1, scale: 1 }}
//     className="text-center py-16"
//   >
//     <div className="text-8xl mb-6">💸</div>
//     <h3 className="text-2xl font-bold text-gray-700 mb-2">No Expenses Yet</h3>
//     <p className="text-gray-500 mb-6">Start tracking your expenses by adding your first entry!</p>
//     <div className="flex items-center justify-center text-indigo-600">
//       <FaEye className="mr-2" />
//       <span>Add an expense to see it here</span>
//     </div>
//   </motion.div>
// );

// export default function Home() {
//   const router = useRouter();
//   const { user } = useUser();
//   const [form, setForm] = useState({ 
//     amount: '', 
//     category: '', 
//     date: '', 
//     paymentMethod: '', 
//     notes: '' 
//   });
//   const [expenses, setExpenses] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [pageLoading, setPageLoading] = useState(true);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const expensesPerPage = 6;

//   const fetchExpenses = async () => {
//     try {
//       setPageLoading(true);
//       const res = await API.get('/expenses');
//       setExpenses(res.data);
//     } catch (err) {
//       console.error(err);
//       if (err.response?.status === 401) {
//         router.push('/login');
//       }
//     } finally {
//       setPageLoading(false);
//     }
//   };

//   useEffect(() => {
//     const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
//     if (!token) {
//       router.push('/');
//       return;
//     }
//     fetchExpenses();
//   }, []);

//   const handleFormChange = (field, value) => {
//     setForm(prev => ({ ...prev, [field]: value }));
//   };

//   const addExpense = async () => {
//     if (!form.amount || !form.category || !form.date || !form.paymentMethod) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     try {
//       setLoading(true);
//       await API.post('/expenses', { 
//         ...form, 
//         amount: Number(form.amount) 
//       });
//       setForm({ 
//         amount: '', 
//         category: '', 
//         date: '', 
//         paymentMethod: '', 
//         notes: '' 
//       });
//       fetchExpenses();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to add expense');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startEdit = (expense) => {
//     setEditingId(expense._id);
//     setEditForm({ 
//       ...expense, 
//       amount: expense.amount.toString(), 
//       date: expense.date.slice(0, 10) 
//     });
//   };

//   const handleEditFormChange = (field, value) => {
//     setEditForm(prev => ({ ...prev, [field]: value }));
//   };

//   const saveEdit = async () => {
//     try {
//       await API.put(`/expenses/${editingId}`, { 
//         ...editForm, 
//         amount: Number(editForm.amount) 
//       });
//       setEditingId(null);
//       setEditForm({});
//       fetchExpenses();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update expense');
//     }
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditForm({});
//   };

//   const deleteExpense = async (id) => {
//     if (!confirm('Are you sure you want to delete this expense?')) return;
    
//     try {
//       await API.delete(`/expenses/${id}`);
//       fetchExpenses();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to delete expense');
//     }
//   };

//   // Pagination calculations
//   const indexOfLast = currentPage * expensesPerPage;
//   const indexOfFirst = indexOfLast - expensesPerPage;
//   const currentExpenses = expenses.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(expenses.length / expensesPerPage);

//   if (pageLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading your expenses...</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//         <motion.main
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="max-w-7xl mx-auto px-6 py-8"
//         >
//           {/* Header */}
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <h1 className="text-5xl font-bold text-gray-900 mb-4">
//               Expense Tracker
//             </h1>
//             <p className="text-xl text-gray-600">
//               Take control of your finances with ease
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//             {/* Add Expense Form */}
//             <motion.div variants={itemVariants}>
//               <AddExpenseForm
//                 form={form}
//                 onFormChange={handleFormChange}
//                 onSubmit={addExpense}
//                 loading={loading}
//               />
//             </motion.div>

//             {/* Quick Stats */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-white rounded-2xl shadow-xl p-8"
//             >
//               <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//                 <FaEye className="mr-3 text-indigo-600" />
//                 Quick Overview
//               </h3>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
//                   <span className="text-gray-700 font-medium">Total Expenses</span>
//                   <span className="text-2xl font-bold text-green-600">{expenses.length}</span>
//                 </div>
//                 <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
//                   <span className="text-gray-700 font-medium">This Month</span>
//                   <span className="text-2xl font-bold text-blue-600">
//                     ₹{expenses
//                       .filter(exp => new Date(exp.date).getMonth() === new Date().getMonth())
//                       .reduce((sum, exp) => sum + exp.amount, 0)
//                       .toLocaleString('en-IN')}
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Expenses Section */}
//           <motion.div variants={itemVariants}>
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-900">
//                 Your Expenses ({expenses.length})
//               </h2>
//               {expenses.length > expensesPerPage && (
//                 <p className="text-gray-600">
//                   Showing {indexOfFirst + 1}-{Math.min(indexOfLast, expenses.length)} of {expenses.length}
//                 </p>
//               )}
//             </div>

//             {expenses.length === 0 ? (
//               <EmptyState />
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                   <AnimatePresence mode="popLayout">
//                     {currentExpenses.map((expense) => (
//                       <ExpenseCard
//                         key={expense._id}
//                         expense={expense}
//                         isEditing={editingId === expense._id}
//                         editForm={editForm}
//                         onEdit={() => startEdit(expense)}
//                         onSave={saveEdit}
//                         onCancel={cancelEdit}
//                         onDelete={() => deleteExpense(expense._id)}
//                         onFormChange={handleEditFormChange}
//                       />
//                     ))}
//                   </AnimatePresence>
//                 </div>

//                 {totalPages > 1 && (
//                   <Pagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={setCurrentPage}
//                   />
//                 )}
//               </>
//             )}
//           </motion.div>
//         </motion.main>
//       </div>
//     </>
//   );
// }


import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import API from '../lib/api';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';
import { 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaRupeeSign, 
  FaCalendarAlt, 
  FaCreditCard,
  FaTag,
  FaStickyNote,
  FaSave,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaEye
} from 'react-icons/fa';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

const ExpenseCard = ({ expense, isEditing, editForm, onEdit, onSave, onCancel, onDelete, onFormChange }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20, scale: 0.9 }}
    whileHover={{ y: -4, scale: 1.02 }}
    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
  >
    <div className="p-6">
      {isEditing ? (
        <EditForm 
          editForm={editForm} 
          onFormChange={onFormChange}
          onSave={onSave}
          onCancel={onCancel}
        />
      ) : (
        <ViewMode 
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  </motion.div>
);

const ViewMode = ({ expense, onEdit, onDelete }) => (
  <>
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <FaRupeeSign className="text-white text-lg" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            ₹{expense.amount.toLocaleString('en-IN')}
          </h3>
          <p className="text-sm text-gray-500 flex items-center">
            <FaCalendarAlt className="mr-1" />
            {new Date(expense.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>
      
      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onEdit}
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <FaEdit />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDelete}
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          <FaTrash />
        </motion.button>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          <FaTag className="mr-1" />
          {expense.category}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <FaCreditCard className="mr-1" />
          {expense.paymentMethod}
        </span>
      </div>

      {expense.notes && (
        <div className="flex items-start space-x-2">
          <FaStickyNote className="text-gray-400 mt-1 text-sm" />
          <p className="text-gray-600 text-sm leading-relaxed">{expense.notes}</p>
        </div>
      )}
    </div>
  </>
);

const EditForm = ({ editForm, onFormChange, onSave, onCancel }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
        <div className="relative">
          <FaRupeeSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            value={editForm.amount}
            onChange={(e) => onFormChange('amount', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="0"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
        <div className="relative">
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="date"
            value={editForm.date}
            onChange={(e) => onFormChange('date', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <div className="relative">
          <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            value={editForm.category}
            onChange={(e) => onFormChange('category', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Food, Transport, etc."
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
        <div className="relative">
          <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            value={editForm.paymentMethod}
            onChange={(e) => onFormChange('paymentMethod', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Cash, Card, UPI"
          />
        </div>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
      <div className="relative">
        <FaStickyNote className="absolute left-3 top-3 text-gray-400" />
        <textarea
          value={editForm.notes}
          onChange={(e) => onFormChange('notes', e.target.value)}
          rows="3"
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
          placeholder="Add any additional notes..."
        />
      </div>
    </div>

    <div className="flex justify-end space-x-3 pt-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onCancel}
        className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
      >
        <FaTimes className="mr-2" />
        Cancel
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSave}
        className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
      >
        <FaSave className="mr-2" />
        Save Changes
      </motion.button>
    </div>
  </div>
);

const AddExpenseForm = ({ form, onFormChange, onSubmit, loading }) => (
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl shadow-xl overflow-hidden"
  >
    <div className="absolute inset-0 bg-black/10" />
    <div className="relative p-8 text-white">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
          <FaPlus className="text-2xl" />
        </div>
        <h2 className="text-3xl font-bold">Add New Expense</h2>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-white/90">Amount (₹)</label>
            <div className="relative">
              <FaRupeeSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
              <input
                type="number"
                value={form.amount}
                onChange={(e) => onFormChange('amount', e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:border-white/50 transition-all"
                placeholder="Enter amount"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white/90">Date</label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
              <input
                type="date"
                value={form.date}
                onChange={(e) => onFormChange('date', e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:bg-white/30 focus:border-white/50 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-white/90">Category</label>
            <div className="relative">
              <FaTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
              <input
                value={form.category}
                onChange={(e) => onFormChange('category', e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:border-white/50 transition-all"
                placeholder="Food, Transport, etc."
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white/90">Payment Method</label>
            <div className="relative">
              <FaCreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
              <input
                value={form.paymentMethod}
                onChange={(e) => onFormChange('paymentMethod', e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:border-white/50 transition-all"
                placeholder="Cash, Card, UPI"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white/90">Notes (Optional)</label>
          <div className="relative">
            <FaStickyNote className="absolute left-4 top-4 text-white/70" />
            <textarea
              value={form.notes}
              onChange={(e) => onFormChange('notes', e.target.value)}
              rows="3"
              className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:border-white/50 transition-all resize-none"
              placeholder="Add any additional notes..."
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          disabled={loading}
          className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-50"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          ) : (
            <FaPlus className="mr-2" />
          )}
          {loading ? 'Adding...' : 'Add Expense'}
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-center space-x-2 mt-8">
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      disabled={currentPage === 1}
      className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      <FaChevronLeft />
    </motion.button>

    {[...Array(totalPages)].map((_, i) => (
      <motion.button
        key={i}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(i + 1)}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          currentPage === i + 1
            ? 'bg-indigo-600 text-white shadow-lg'
            : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
        }`}
      >
        {i + 1}
      </motion.button>
    ))}

    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      disabled={currentPage === totalPages}
      className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      <FaChevronRight />
    </motion.button>
  </div>
);

const EmptyState = ({ isLoggedIn, onLoginClick }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-16"
  >
    <div className="text-8xl mb-6">💸</div>
    <h3 className="text-2xl font-bold text-gray-700 mb-2">
      {isLoggedIn ? "No Expenses Yet" : "Welcome to Expense Tracker"}
    </h3>
    <p className="text-gray-500 mb-6">
      {isLoggedIn 
        ? "Start tracking your expenses by adding your first entry!" 
        : "Please login to view and manage your expenses"}
    </p>
    <div className="flex items-center justify-center text-indigo-600">
      {isLoggedIn ? (
        <>
          <FaEye className="mr-2" />
          <span>Add an expense to see it here</span>
        </>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLoginClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center"
        >
          🔐 Login to Get Started
        </motion.button>
      )}
    </div>
  </motion.div>
);

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const [form, setForm] = useState({ 
    amount: '', 
    category: '', 
    date: '', 
    paymentMethod: '', 
    notes: '' 
  });
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false); // Changed to false
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 6;

  const fetchExpenses = async () => {
    try {
      setPageLoading(true);
      const res = await API.get('/expenses');
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
      // Don't redirect to login on error - just show empty state
      setExpenses([]);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      setIsLoggedIn(true);
      fetchExpenses();
    } else {
      setIsLoggedIn(false);
      // For guest users, show empty expenses initially
      setExpenses([]);
      setPageLoading(false);
    }
  }, []);

  const handleFormChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const addExpense = async () => {
    // If not logged in, show login prompt immediately
    if (!isLoggedIn) {
      const shouldLogin = confirm('Please login to add expenses. Do you want to login now?');
      if (shouldLogin) {
        router.push('/login');
      }
      return;
    }

    if (!form.amount || !form.category || !form.date || !form.paymentMethod) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await API.post('/expenses', { 
        ...form, 
        amount: Number(form.amount) 
      });
      setForm({ 
        amount: '', 
        category: '', 
        date: '', 
        paymentMethod: '', 
        notes: '' 
      });
      fetchExpenses();
    } catch (err) {
      console.error(err);
      alert('Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (expense) => {
    if (!isLoggedIn) {
      alert('Please login to edit expenses');
      return;
    }
    setEditingId(expense._id);
    setEditForm({ 
      ...expense, 
      amount: expense.amount.toString(), 
      date: expense.date.slice(0, 10) 
    });
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const saveEdit = async () => {
    try {
      await API.put(`/expenses/${editingId}`, { 
        ...editForm, 
        amount: Number(editForm.amount) 
      });
      setEditingId(null);
      setEditForm({});
      fetchExpenses();
    } catch (err) {
      console.error(err);
      alert('Failed to update expense');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const deleteExpense = async (id) => {
    if (!isLoggedIn) {
      alert('Please login to delete expenses');
      return;
    }
    
    if (!confirm('Are you sure you want to delete this expense?')) return;
    
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error(err);
      alert('Failed to delete expense');
    }
  };

  // Pagination calculations
  const indexOfLast = currentPage * expensesPerPage;
  const indexOfFirst = indexOfLast - expensesPerPage;
  const currentExpenses = expenses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(expenses.length / expensesPerPage);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-6 py-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Expense Tracker
            </h1>
            <p className="text-xl text-gray-600">
              Take control of your finances with ease
            </p>
            {!isLoggedIn && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-center">
                  🔒 Please 
                  <button 
                    onClick={() => router.push('/login')} 
                    className="text-blue-900 underline hover:text-blue-700 mx-1 font-semibold"
                  >
                    login
                  </button> 
                  to start tracking your expenses and unlock all features.
                </p>
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Add Expense Form */}
            <motion.div variants={itemVariants}>
              <AddExpenseForm
                form={form}
                onFormChange={handleFormChange}
                onSubmit={addExpense}
                loading={loading}
              />
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaEye className="mr-3 text-indigo-600" />
                Quick Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <span className="text-gray-700 font-medium">Total Expenses</span>
                  <span className="text-2xl font-bold text-green-600">{expenses.length}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <span className="text-gray-700 font-medium">This Month</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{expenses
                      .filter(exp => new Date(exp.date).getMonth() === new Date().getMonth())
                      .reduce((sum, exp) => sum + exp.amount, 0)
                      .toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Expenses Section */}
          <motion.div variants={itemVariants}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {isLoggedIn ? `Your Expenses (${expenses.length})` : 'Your Expenses'}
              </h2>
              {expenses.length > expensesPerPage && (
                <p className="text-gray-600">
                  Showing {indexOfFirst + 1}-{Math.min(indexOfLast, expenses.length)} of {expenses.length}
                </p>
              )}
            </div>

            {pageLoading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading expenses...</p>
              </div>
            ) : expenses.length === 0 ? (
              <EmptyState 
                isLoggedIn={isLoggedIn} 
                onLoginClick={() => router.push('/login')} 
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {currentExpenses.map((expense) => (
                      <ExpenseCard
                        key={expense._id}
                        expense={expense}
                        isEditing={editingId === expense._id}
                        editForm={editForm}
                        onEdit={() => startEdit(expense)}
                        onSave={saveEdit}
                        onCancel={cancelEdit}
                        onDelete={() => deleteExpense(expense._id)}
                        onFormChange={handleEditFormChange}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </motion.div>
        </motion.main>
      </div>
    </>
  );
}