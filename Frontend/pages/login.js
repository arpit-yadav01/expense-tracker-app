// // import { useState } from 'react';
// // import API from '../lib/api';
// // import { useRouter } from 'next/router';
// // import { useUser } from '../context/UserContext';

// // export default function Login() {
// //   const [form, setForm] = useState({ email: '', password: '' });
// //   const router = useRouter();
// //   const { login } = useUser();

// //   const handleLogin = async () => {
// //     try {
// //       const res = await API.post('/auth/login', form);
// //       login(res.data.token);
// //       router.push('/');
// //     } catch (err) {
// //       alert('Login failed');
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center p-4">
// //       <div className="w-full max-w-md card p-6">
// //         <h1 className="text-2xl font-bold mb-4">Login</h1>
// //         <input className="input mb-2" placeholder="Email" value={form.email}
// //           onChange={e => setForm({ ...form, email: e.target.value })} />
// //         <input type="password" className="input mb-4" placeholder="Password" value={form.password}
// //           onChange={e => setForm({ ...form, password: e.target.value })} />
// //         <button onClick={handleLogin} className="btn w-full">Login</button>
// //       </div>
// //     </div>
// //   )
// // }


// import { useState } from "react";
// import API from "../lib/api";
// import { useRouter } from "next/router";
// import { useUser } from "../context/UserContext";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const router = useRouter();
//   const { login } = useUser();

//   const handleLogin = async () => {
//     setErrorMsg("");
//     setLoading(true);

//     try {
//       const res = await API.post("/auth/login", form);
//       // Assuming backend returns { token: "..." } on success
//       if (res?.data?.token) {
//         login(res.data.token); // save token in context / localStorage
//         router.push("/"); // redirect to home
//       } else {
//         // Unexpected success response shape
//         setErrorMsg("Login succeeded but no token returned. Check backend.");
//       }
//     } catch (err) {
//       // Inspect backend response to show user-friendly messages.
//       const backendMsg = err?.response?.data?.message || err?.response?.data?.msg;
//       const status = err?.response?.status;

//       // Customize based on backend behavior:
//       // - 404 or message like "User not found" => ask to signup
//       // - 401 or message like "Invalid credentials" => inform user
//       if (status === 404 || /not found/i.test(backendMsg || "")) {
//         const goToSignup = window.confirm(
//           "No account found for this email. Do you want to create one now?"
//         );
//         if (goToSignup) router.push("/signup");
//       } else if (status === 401 || /invalid credentials/i.test(backendMsg || "")) {
//         setErrorMsg("Invalid email or password. Please try again.");
//       } else {
//         // Generic fallback
//         setErrorMsg(backendMsg || "Login failed. Please try again later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="w-full max-w-md card p-6">
//         <h1 className="text-2xl font-bold mb-4">Login</h1>

//         {errorMsg && (
//           <div className="mb-3 text-sm text-red-600">
//             {errorMsg}
//             {/* quick inline hint to signup */}
//             {/account found/i.test(errorMsg) ? null : null}
//           </div>
//         )}

//         <input
//           className="input mb-2"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           type="password"
//           className="input mb-4"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button
//           onClick={handleLogin}
//           className="btn w-full"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="mt-4 text-center text-sm">
//           Don't have an account?{" "}
//           <a
//             className="text-blue-600 hover:underline"
//             onClick={() => router.push("/signup")}
//             style={{ cursor: "pointer" }}
//           >
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// Login.js
import { useState } from "react";
import { motion } from "framer-motion";
import API from "../lib/api";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaSpinner,
  FaUserPlus,
  FaSignInAlt,
  FaExclamationTriangle
} from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const formVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useUser();

  const handleLogin = async () => {
    setErrorMsg("");
    
    if (!form.email || !form.password) {
      setErrorMsg("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      if (res?.data?.token) {
        login(res.data.token);
        router.push("/");
      } else {
        setErrorMsg("Login succeeded but no token returned. Check backend.");
      }
    } catch (err) {
      const backendMsg = err?.response?.data?.message || err?.response?.data?.msg;
      const status = err?.response?.status;

      if (status === 404 || /not found/i.test(backendMsg || "")) {
        const goToSignup = window.confirm(
          "No account found for this email. Do you want to create one now?"
        );
        if (goToSignup) router.push("/signup");
      } else if (status === 401 || /invalid credentials/i.test(backendMsg || "")) {
        setErrorMsg("Invalid email or password. Please try again.");
      } else {
        setErrorMsg(backendMsg || "Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <motion.div
          variants={formVariants}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <FaSignInAlt className="text-2xl text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-indigo-100">Sign in to your account</p>
          </div>

          <div className="p-8">
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center"
              >
                <FaExclamationTriangle className="text-red-500 mr-3" />
                <span className="text-red-700 text-sm">{errorMsg}</span>
              </motion.div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaSignInAlt className="mr-2" />
                )}
                {loading ? "Signing in..." : "Sign In"}
              </motion.button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => router.push("/signup")}
                  className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
                >
                  Create one now
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
