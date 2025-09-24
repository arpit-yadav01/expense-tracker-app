
// import { useState } from "react";
// import API from "../lib/api";
// import { useRouter } from "next/router";
// import { useUser } from "../context/UserContext";

// export default function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errorMsg, setErrorMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const { login } = useUser();

//   const handleSignup = async () => {
//     setErrorMsg("");

//     // ✅ Frontend validation
//     if (!form.name || !form.email || !form.password || !form.confirmPassword) {
//       setErrorMsg("All fields are required.");
//       return;
//     }
//     if (form.password !== form.confirmPassword) {
//       setErrorMsg("Passwords do not match.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Send name + email + password to backend
//       const res = await API.post("/auth/signup", {
//         name: form.name,
//         email: form.email,
//         password: form.password,
//       });

//       // ✅ Signup success → login user + go to expenses page
//       if (res?.data?.token) {
//         login(res.data.token);
//         router.push("/");
//       } else {
//         setErrorMsg("Unexpected response. Please try again.");
//       }
//     } catch (err) {
//       const status = err?.response?.status;
//       const backendMsg =
//         err?.response?.data?.message ||
//         err?.response?.data?.msg ||
//         "Signup failed";

//       if (status === 400 || status === 409 || /already/i.test(backendMsg)) {
//         setErrorMsg("You are already registered. Redirecting to login...");
//         setTimeout(() => {
//           router.push("/login");
//         }, 2000);
//       } else {
//         setErrorMsg(backendMsg);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="w-full max-w-md card p-6">
//         <h1 className="text-2xl font-bold mb-4">Signup</h1>

//         {errorMsg && (
//           <div className="mb-3 text-sm text-red-600">{errorMsg}</div>
//         )}

//         <input
//           className="input mb-2"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           className="input mb-2"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           type="password"
//           className="input mb-2"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <input
//           type="password"
//           className="input mb-4"
//           placeholder="Confirm Password"
//           value={form.confirmPassword}
//           onChange={(e) =>
//             setForm({ ...form, confirmPassword: e.target.value })
//           }
//         />

//         <button
//           onClick={handleSignup}
//           className="btn w-full"
//           disabled={loading}
//         >
//           {loading ? "Signing up..." : "Signup"}
//         </button>

//         <p className="mt-4 text-center text-sm">
//           Already have an account?{" "}
//           <a
//             className="text-blue-600 hover:underline"
//             onClick={() => router.push("/login")}
//             style={{ cursor: "pointer" }}
//           >
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }


import API from "../lib/api";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaExclamationTriangle, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

// Signup.js
export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { login } = useUser();

  const handleSignup = async () => {
    setErrorMsg("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setErrorMsg("All fields are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (res?.data?.token) {
        login(res.data.token);
        router.push("/");
      } else {
        setErrorMsg("Unexpected response. Please try again.");
      }
    } catch (err) {
      const status = err?.response?.status;
      const backendMsg = err?.response?.data?.message || err?.response?.data?.msg || "Signup failed";

      if (status === 400 || status === 409 || /already/i.test(backendMsg)) {
        setErrorMsg("You are already registered. Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setErrorMsg(backendMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
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
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <FaUserPlus className="text-2xl text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-green-100">Join us to start tracking expenses</p>
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
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

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
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Create a password"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaUserPlus className="mr-2" />
                )}
                {loading ? "Creating account..." : "Create Account"}
              </motion.button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => router.push("/login")}
                  className="text-green-600 hover:text-green-500 font-medium transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
