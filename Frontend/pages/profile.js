// // import { useState, useEffect } from "react";
// // import API from "../lib/api";
// // import { useUser } from "../context/UserContext";

// // export default function Profile() {
// //   const { user, updateUser } = useUser();
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     dob: "",
// //     phone: "",
// //     location: "",
// //     bio: "",
// //   });
// //   const [editing, setEditing] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [msg, setMsg] = useState(null);
// //   const [msgType, setMsgType] = useState("info");

// //   useEffect(() => {
// //     if (user) {
// //       setForm({
// //         name: user.name || "",
// //         email: user.email || "",
// //         dob: user.dob ? user.dob.slice(0, 10) : "", // format YYYY-MM-DD
// //         phone: user.phone || "",
// //         location: user.location || "",
// //         bio: user.bio || "",
// //       });
// //     }
// //   }, [user]);

// //   if (!user) return <div className="p-8">Loading...</div>;

// //   const initials = (form.name || "U")
// //     .split(" ")
// //     .map((s) => s[0])
// //     .slice(0, 2)
// //     .join("")
// //     .toUpperCase();

// //   const handleChange = (key, value) => {
// //     setForm((prev) => ({ ...prev, [key]: value }));
// //   };

// //   const handleCancel = () => {
// //     setForm({
// //       name: user.name || "",
// //       email: user.email || "",
// //       dob: user.dob ? user.dob.slice(0, 10) : "",
// //       phone: user.phone || "",
// //       location: user.location || "",
// //       bio: user.bio || "",
// //     });
// //     setMsg(null);
// //     setEditing(false);
// //   };

// //   const handleSave = async () => {
// //     setMsg(null);

// //     if (form.phone && !/^[\d+\-()\s]{6,20}$/.test(form.phone)) {
// //       setMsgType("error");
// //       setMsg("Please enter a valid phone number.");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const payload = {
// //         name: form.name,
// //         dob: form.dob,
// //         phone: form.phone || undefined,
// //         location: form.location || undefined,
// //         bio: form.bio || undefined,
// //       };

// //       const res = await API.put("/auth/me", payload);
// //       const updatedUser = res?.data?.user || res?.data;

// //       if (updateUser && updatedUser) updateUser(updatedUser);

// //       setMsgType("success");
// //       setMsg("Profile updated successfully.");
// //       setEditing(false);
// //     } catch (err) {
// //       const backendMsg =
// //         err?.response?.data?.message || err?.response?.data?.msg || "Update failed. Try again.";
// //       setMsgType("error");
// //       setMsg(backendMsg);
// //     } finally {
// //       setLoading(false);
// //       setTimeout(() => setMsg(null), 4500);
// //     }
// //   };

// //   return (
// //     <div className="p-8 max-w-3xl mx-auto">
// //       <div className="card p-6 shadow-lg rounded-2xl bg-white">
// //         <div className="flex items-center gap-6">
// //           <div
// //             className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white"
// //             style={{ background: "#4f46e5" }}
// //           >
// //             {initials}
// //           </div>

// //           <div className="flex-1">
// //             <h1 className="text-2xl font-semibold">{form.name || "User"}</h1>
// //             <p className="text-sm text-gray-500">{form.email}</p>
// //           </div>

// //           <div className="flex gap-2">
// //             {!editing ? (
// //               <button
// //                 onClick={() => setEditing(true)}
// //                 className="btn border px-4 py-2 rounded-lg"
// //               >
// //                 Edit Profile
// //               </button>
// //             ) : (
// //               <>
// //                 <button
// //                   onClick={handleSave}
// //                   disabled={loading}
// //                   className="btn bg-indigo-600 text-white px-4 py-2 rounded-lg"
// //                 >
// //                   {loading ? "Saving..." : "Save"}
// //                 </button>
// //                 <button
// //                   onClick={handleCancel}
// //                   className="btn border px-4 py-2 rounded-lg"
// //                 >
// //                   Cancel
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
// //           {/* Name - editable */}
// //           <div>
// //             <label className="text-sm text-gray-600">Full Name</label>
// //             <input
// //               value={form.name}
// //               onChange={(e) => handleChange("name", e.target.value)}
// //               disabled={!editing}
// //               className={`input mt-1 w-full ${!editing ? "bg-gray-50 cursor-not-allowed" : ""}`}
// //             />
// //           </div>

// //           {/* Email - read only */}
// //           <div>
// //             <label className="text-sm text-gray-600">Email</label>
// //             <input
// //               readOnly
// //               value={form.email}
// //               className="input mt-1 w-full bg-gray-50 cursor-not-allowed"
// //             />
// //           </div>

// //           {/* DOB - editable */}
// //           <div>
// //             <label className="text-sm text-gray-600">Date of Birth</label>
// //             <input
// //               type="date"
// //               value={form.dob}
// //               onChange={(e) => handleChange("dob", e.target.value)}
// //               disabled={!editing}
// //               className={`input mt-1 w-full ${!editing ? "bg-gray-50 cursor-not-allowed" : ""}`}
// //             />
// //           </div>

// //           {/* Phone - editable */}
// //           <div>
// //             <label className="text-sm text-gray-600">Phone</label>
// //             <input
// //               value={form.phone}
// //               onChange={(e) => handleChange("phone", e.target.value)}
// //               disabled={!editing}
// //               placeholder="e.g. +91 98765 43210"
// //               className={`input mt-1 w-full ${!editing ? "bg-gray-50 cursor-not-allowed" : ""}`}
// //             />
// //           </div>

// //           {/* Location - editable */}
// //           <div>
// //             <label className="text-sm text-gray-600">Location</label>
// //             <input
// //               value={form.location}
// //               onChange={(e) => handleChange("location", e.target.value)}
// //               disabled={!editing}
// //               placeholder="City, Country"
// //               className={`input mt-1 w-full ${!editing ? "bg-gray-50 cursor-not-allowed" : ""}`}
// //             />
// //           </div>

// //           {/* Bio - editable full width */}
// //           <div className="md:col-span-2">
// //             <label className="text-sm text-gray-600">Bio</label>
// //             <textarea
// //               value={form.bio}
// //               onChange={(e) => handleChange("bio", e.target.value)}
// //               disabled={!editing}
// //               rows={4}
// //               placeholder="A short bio (optional)"
// //               className={`input mt-1 w-full resize-none ${!editing ? "bg-gray-50 cursor-not-allowed" : ""}`}
// //             />
// //           </div>
// //         </div>

// //         {msg && (
// //           <div
// //             className={`mt-4 p-3 rounded-lg text-sm ${
// //               msgType === "success"
// //                 ? "bg-green-50 text-green-700"
// //                 : msgType === "error"
// //                 ? "bg-red-50 text-red-700"
// //                 : "bg-gray-50 text-gray-700"
// //             }`}
// //           >
// //             {msg}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



// import {useEffect } from "react";
// import API from "../lib/api";
// import { useUser } from "../context/UserContext";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaSave, FaTimes, FaCheckCircle, FaSpinner } from "react-icons/fa";

// // Profile.js
// export function Profile() {
//   const { user, updateUser } = useUser();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     dob: "",
//     phone: "",
//     location: "",
//     bio: "",
//   });
//   const [editing, setEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState(null);
//   const [msgType, setMsgType] = useState("info");

//   useEffect(() => {
//     if (user) {
//       setForm({
//         name: user.name || "",
//         email: user.email || "",
//         dob: user.dob ? user.dob.slice(0, 10) : "",
//         phone: user.phone || "",
//         location: user.location || "",
//         bio: user.bio || "",
//       });
//     }
//   }, [user]);

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   const initials = (form.name || "U")
//     .split(" ")
//     .map((s) => s[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();

//   const handleChange = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleCancel = () => {
//     setForm({
//       name: user.name || "",
//       email: user.email || "",
//       dob: user.dob ? user.dob.slice(0, 10) : "",
//       phone: user.phone || "",
//       location: user.location || "",
//       bio: user.bio || "",
//     });
//     setMsg(null);
//     setEditing(false);
//   };

//   const handleSave = async () => {
//     setMsg(null);

//     if (form.phone && !/^[\d+\-()\s]{6,20}$/.test(form.phone)) {
//       setMsgType("error");
//       setMsg("Please enter a valid phone number.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         name: form.name,
//         dob: form.dob,
//         phone: form.phone || undefined,
//         location: form.location || undefined,
//         bio: form.bio || undefined,
//       };

//       const res = await API.put("/auth/me", payload);
//       const updatedUser = res?.data?.user || res?.data;

//       if (updateUser && updatedUser) updateUser(updatedUser);

//       setMsgType("success");
//       setMsg("Profile updated successfully.");
//       setEditing(false);
//     } catch (err) {
//       const backendMsg = err?.response?.data?.message || err?.response?.data?.msg || "Update failed. Try again.";
//       setMsgType("error");
//       setMsg(backendMsg);
//     } finally {
//       setLoading(false);
//       setTimeout(() => setMsg(null), 4500);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-4xl mx-auto px-6"
//       >
//         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//           {/* Header Section */}
//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-6">
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold text-white"
//                 >
//                   {initials}
//                 </motion.div>
//                 <div>
//                   <h1 className="text-3xl font-bold text-white mb-2">{form.name || "User"}</h1>
//                   <p className="text-indigo-100 flex items-center">
//                     <FaEnvelope className="mr-2" />
//                     {form.email}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex space-x-3">
//                 {!editing ? (
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setEditing(true)}
//                     className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center"
//                   >
//                     <FaEdit className="mr-2" />
//                     Edit Profile
//                   </motion.button>
//                 ) : (
//                   <>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={handleSave}
//                       disabled={loading}
//                       className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center disabled:opacity-50"
//                     >
//                       {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaSave className="mr-2" />}
//                       {loading ? "Saving..." : "Save"}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={handleCancel}
//                       className="bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center"
//                     >
//                       <FaTimes className="mr-2" />
//                       Cancel
//                     </motion.button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Form Section */}
//           <div className="p-8">
//             {msg && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className={`mb-6 p-4 rounded-lg flex items-center ${
//                   msgType === "success"
//                     ? "bg-green-50 border border-green-200 text-green-700"
//                     : "bg-red-50 border border-red-200 text-red-700"
//                 }`}
//               >
//                 <FaCheckCircle className="mr-3" />
//                 {msg}
//               </motion.div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <FaUser className="inline mr-2" />
//                   Full Name
//                 </label>
//                 <input
//                   value={form.name}
//                   onChange={(e) => handleChange("name", e.target.value)}
//                   disabled={!editing}
//                   className={`w-full px-4 py-3 border border-gray-200 rounded-lg transition-all ${
//                     !editing ? "bg-gray-50 cursor-not-allowed" : "focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   }`}
//                   placeholder="Enter your full name"
//                 />
//               </div>

//               {/* Email (read-only) */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <FaEnvelope className="inline mr-2" />
//                   Email Address
//                 </label>
//                 <input
//                   readOnly
//                   value={form.email}
//                   className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed"
//                 />
//               </div>

//               {/* Date of Birth */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <FaCalendarAlt className="inline mr-2" />
//                   Date of Birth
//                 </label>
//                 <input
//                   type="date"
//                   value={form.dob}
//                   onChange={(e) => handleChange("dob", e.target.value)}
//                   disabled={!editing}
//                   className={`w-full px-4 py-3 border border-gray-200 rounded-lg transition-all ${
//                     !editing ? "bg-gray-50 cursor-not-allowed" : "focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   }`}
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <FaPhone className="inline mr-2" />
//                   Phone Number
//                 </label>
//                 <input
//                   value={form.phone}
//                   onChange={(e) => handleChange("phone", e.target.value)}
//                   disabled={!editing}
//                   placeholder="e.g. +91 98765 43210"
//                   className={`w-full px-4 py-3 border border-gray-200 rounded-lg transition-all ${
//                     !editing ? "bg-gray-50 cursor-not-allowed" : "focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   }`}
//                 />
//               </div>

//               {/* Location */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <FaMapMarkerAlt className="inline mr-2" />
//                   Location
//                 </label>
//                 <input
//                   value={form.location}
//                   onChange={(e) => handleChange("location", e.target.value)}
//                   disabled={!editing}
//                   placeholder="City, Country"
//                   className={`w-full px-4 py-3 border border-gray-200 rounded-lg transition-all ${
//                     !editing ? "bg-gray-50 cursor-not-allowed" : "focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   }`}
//                 />
//               </div>

//               {/* Bio */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Bio
//                 </label>
//                 <textarea
//                   value={form.bio}
//                   onChange={(e) => handleChange("bio", e.target.value)}
//                   disabled={!editing}
//                   rows={4}
//                   placeholder="Tell us about yourself..."
//                   className={`w-full px-4 py-3 border border-gray-200 rounded-lg transition-all resize-none ${
//                     !editing ? "bg-gray-50 cursor-not-allowed" : "focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   }`}
//                 />
//               </div>
//             </div>

//             <div className="mt-8 pt-6 border-t border-gray-200">
//               <p className="text-sm text-gray-500">
//                 <strong>User ID:</strong> {user._id}
//               </p>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default Profile;



// Step 2: Enhanced Profile Component with Better Debugging
import { useEffect, useState } from "react";
import API from "../lib/api";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaCheckCircle, 
  FaSpinner,
  FaExclamationTriangle,
  FaSync
} from "react-icons/fa";

export default function Profile() {
  const { user, updateUser } = useUser();
  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    location: "",
    bio: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [msgType, setMsgType] = useState("info");

  // Debug function to check localStorage
  const debugStorage = () => {
    console.log('=== DEBUG STORAGE ===');
    console.log('localStorage user:', localStorage.getItem('user'));
    console.log('Context user:', user);
    console.log('Form state:', form);
    console.log('==================');
  };

  // Fetch fresh user data from API
  const fetchUserProfile = async () => {
    try {
      console.log('Fetching user profile from API...');
      const response = await API.get("/auth/me");
      const userData = response.data;
      
      console.log('API Response:', userData);
      
      // Update context (this should also update localStorage)
      if (updateUser) {
        updateUser(userData);
        console.log('Updated user context');
      }
      
      // Update form state
      const formData = {
        name: userData.name || "",
        email: userData.email || "",
        dob: userData.dob ? userData.dob.slice(0, 10) : "",
        phone: userData.phone || "",
        location: userData.location || "",
        bio: userData.bio || "",
      };
      
      setForm(formData);
      console.log('Updated form state:', formData);
      
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setMsgType("error");
      setMsg("Failed to load profile data");
    } finally {
      setPageLoading(false);
    }
  };

  // Load on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Sync form with user context changes
  useEffect(() => {
    if (user) {
      console.log('User context changed, updating form...');
      setForm({
        name: user.name || "",
        email: user.email || "",
        dob: user.dob ? user.dob.slice(0, 10) : "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    // Reset to current user data
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        dob: user.dob ? user.dob.slice(0, 10) : "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
      });
    }
    setMsg(null);
    setEditing(false);
  };

  const handleSave = async () => {
    setMsg(null);

    // Validation
    if (!form.name.trim()) {
      setMsgType("error");
      setMsg("Name is required.");
      return;
    }

    if (form.phone && !/^[\d+\-()\s]{6,20}$/.test(form.phone)) {
      setMsgType("error");
      setMsg("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    
    try {
      const payload = {
        name: form.name.trim(),
        dob: form.dob || undefined,
        phone: form.phone.trim() || undefined,
        location: form.location.trim() || undefined,
        bio: form.bio.trim() || undefined,
      };

      console.log("=== SAVE ATTEMPT ===");
      console.log("Payload being sent:", payload);

      const response = await API.put("/auth/me", payload);
      console.log("API Response:", response.data);

      // Extract updated user data
      const updatedUser = response.data.user || response.data;
      console.log("Updated user data:", updatedUser);

      // CRITICAL: Update the context with fresh data
      if (updateUser && updatedUser) {
        updateUser(updatedUser);
        console.log("User context updated successfully");
      }

      // Update form with the response data (in case backend modifies anything)
      setForm({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        dob: updatedUser.dob ? updatedUser.dob.slice(0, 10) : "",
        phone: updatedUser.phone || "",
        location: updatedUser.location || "",
        bio: updatedUser.bio || "",
      });

      console.log("Form updated with response data");
      
      // Debug storage after update
      setTimeout(() => {
        debugStorage();
      }, 100);

      setMsgType("success");
      setMsg("Profile updated successfully! Changes will persist across sessions.");
      setEditing(false);

    } catch (err) {
      console.error("Profile update error:", err);
      console.error("Error response:", err.response?.data);
      
      const backendMsg = err?.response?.data?.message || 
                        err?.response?.data?.msg || 
                        "Update failed. Please try again.";
      setMsgType("error");
      setMsg(backendMsg);
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(null), 5000);
    }
  };

  // Manual refresh function
  const handleRefresh = () => {
    setPageLoading(true);
    fetchUserProfile();
  };

  if (pageLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Unable to load profile data.</p>
            <button
              onClick={handleRefresh}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center mx-auto"
            >
              <FaSync className="mr-2" />
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  const initials = (form.name || "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold text-white"
                  >
                    {initials}
                  </motion.div>
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{form.name || "User"}</h1>
                    <p className="text-indigo-100 flex items-center">
                      <FaEnvelope className="mr-2" />
                      {form.email}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  {/* Debug button - remove in production */}
                  <button
                    onClick={debugStorage}
                    className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg transition-all"
                    title="Debug Storage (remove in production)"
                  >
                    Debug
                  </button>
                  
                  <button
                    onClick={handleRefresh}
                    className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-all flex items-center"
                    title="Refresh Profile Data"
                  >
                    <FaSync />
                  </button>

                  {!editing ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditing(true)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center"
                    >
                      <FaEdit className="mr-2" />
                      Edit Profile
                    </motion.button>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center disabled:opacity-50"
                      >
                        {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaSave className="mr-2" />}
                        {loading ? "Saving..." : "Save"}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCancel}
                        className="bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center"
                      >
                        <FaTimes className="mr-2" />
                        Cancel
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-8">
              {msg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-lg flex items-center ${
                    msgType === "success"
                      ? "bg-green-50 border border-green-200 text-green-700"
                      : "bg-red-50 border border-red-200 text-red-700"
                  }`}
                >
                  {msgType === "success" ? <FaCheckCircle className="mr-3" /> : <FaExclamationTriangle className="mr-3" />}
                  {msg}
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name - Editable */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    disabled={!editing}
                    required
                    className={`w-full px-4 py-3 border border-gray-200 rounded-lg transition-all ${
                      !editing ? "bg-gray-50 cursor-not-allowed" : "focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email - Read Only */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2" />
                    Email Address
                  </label>
                  <input
                    readOnly
                    value={form.email}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed"
                    title="Email cannot be changed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email address cannot be changed</p>
                </div>

                {/* Date of Birth - Editable */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaCalendarAlt className="inline mr-2" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={form.dob}
                    onChange={(e) => handleChange("dob", e.target.value)}
                    disabled={!editing}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-lg transition-all ${
                      !editing ? "bg-gray-50 cursor-not-allowed" : "focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    }`}
                  />
                </div>

                {/* Phone - Editable */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaPhone className="inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    disabled={!editing}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full px-4 py-3 border border-gray-200 rounded-lg transition-all ${
                      !editing ? "bg-gray-50 cursor-not-allowed" : "focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    }`}
                  />
                </div>

                {/* Location - Editable */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaMapMarkerAlt className="inline mr-2" />
                    Location
                  </label>
                  <input
                    value={form.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    disabled={!editing}
                    placeholder="City, Country"
                    className={`w-full px-4 py-3 border border-gray-200 rounded-lg transition-all ${
                      !editing ? "bg-gray-50 cursor-not-allowed" : "focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    }`}
                  />
                </div>

                {/* Bio - Editable Full Width */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    disabled={!editing}
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className={`w-full px-4 py-3 border border-gray-200 rounded-lg transition-all resize-none ${
                      !editing ? "bg-gray-50 cursor-not-allowed" : "focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    }`}
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      <strong>User ID:</strong> {user._id}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      * Required fields
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      Last updated: {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}