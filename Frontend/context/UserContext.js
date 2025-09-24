// import { createContext, useContext, useState, useEffect } from "react";
// import API from "../lib/api";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(typeof window !== 'undefined' ? localStorage.getItem("token") : null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!token) {
//         setUser(null);
//         return;
//       }
//       try {
//         const res = await API.get("/auth/me");
//         setUser(res.data);
//       } catch (err) {
//         setUser(null);
//       }
//     };
//     fetchUser();
//   }, [token]);

//   const login = (jwt) => {
//     if (typeof window !== 'undefined') localStorage.setItem("token", jwt);
//     setToken(jwt);
//   };

//   const logout = () => {
//     if (typeof window !== 'undefined') localStorage.removeItem("token");
//     setToken(null);
//     if (typeof window !== 'undefined') window.location.href = "/login";
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);

import { createContext, useContext, useState, useEffect } from "react";
import API from "../lib/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const res = await API.get("/auth/me");
        setUser(res.data.user || res.data); // depending on your backend wrap
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, [token]);

  const login = (jwt, userData = null) => {
    if (typeof window !== "undefined") localStorage.setItem("token", jwt);
    setToken(jwt);
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    setToken(null);
    setUser(null);
  };

  // NEW: update user state after profile edit
  const updateUser = (updatedData) => {
    setUser(updatedData);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(updatedData));
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
