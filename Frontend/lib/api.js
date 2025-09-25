// import axios from 'axios'

// const API = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'
// });

// API.interceptors.request.use((req) => {
//   if (typeof window !== 'undefined') {
//     const token = localStorage.getItem('token');
//     if (token) req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// export default API;
  

// frontend/lib/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NODE_BACKEND, // Node backend base URL
});

API.interceptors.request.use((req) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
