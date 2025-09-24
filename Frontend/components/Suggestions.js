// // components/Suggestions.js
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaLightbulb } from "react-icons/fa";
// import API from "../lib/api"; // axios wrapper (points to backend)

// export default function Suggestions({ expenses }) {
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!expenses || expenses.length === 0) return;

//     const fetchSuggestions = async () => {
//       try {
//         setLoading(true);
//         const res = await API.post("/suggestions", { expenses });
//         setSuggestions(res.data.suggestions || []);
//       } catch (err) {
//         console.error("Failed to fetch suggestions:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSuggestions();
//   }, [expenses]);

//   return (
//     <motion.div
//       className="bg-white rounded-xl shadow-lg p-6 mt-8"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <h2 className="text-xl font-bold text-gray-900 flex items-center mb-4">
//         <FaLightbulb className="text-yellow-500 mr-2" />
//         Smart Suggestions
//       </h2>

//       {loading ? (
//         <p className="text-gray-500">Analyzing your expenses...</p>
//       ) : suggestions.length === 0 ? (
//         <p className="text-gray-500">No suggestions yet. Add some expenses.</p>
//       ) : (
//         <ul className="space-y-2">
//           {suggestions.map((s, i) => (
//             <li
//               key={i}
//               className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md text-gray-800"
//             >
//               {s}
//             </li>
//           ))}
//         </ul>
//       )}
//     </motion.div>
//   );
// }


import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLightbulb } from "react-icons/fa";
import FlaskAPI from "../lib/flaskApi"; // ⚡ Use Flask API only for suggestions

export default function Suggestions({ expenses }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!expenses || expenses.length === 0) return;

    // Filter out invalid expenses before sending to Flask
    const validExpenses = Array.isArray(expenses)
      ? expenses.filter(e =>
          e &&
          typeof e.amount === "number" &&
          e.category &&
          e.date
        )
      : [];

    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const res = await FlaskAPI.post("/suggestions", { expenses: validExpenses });
        setSuggestions(res.data.suggestions || []);
      } catch (err) {
        console.error("Failed to fetch suggestions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [expenses]);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      
      <h2 className="text-xl font-bold text-gray-900 flex items-center mb-4">
        <FaLightbulb className="text-yellow-500 mr-2" />
        Smart Suggestions
      </h2>

      {loading ? (
        <p className="text-gray-500">Analyzing your expenses...</p>
      ) : suggestions.length === 0 ? (
        <p className="text-gray-500">No suggestions yet. Add some expenses.</p>
      ) : (
        <ul className="space-y-2">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md text-gray-800"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
