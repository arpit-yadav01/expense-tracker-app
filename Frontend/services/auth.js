import API from '../lib/api';

// Login
export const login = async (email, password) => {
  const res = await API.post('/auth/login', { email, password });
  return res.data;
};

// Signup
export const signup = async (email, password) => {
  const res = await API.post('/auth/register', { email, password });
  return res.data;
};

// Fetch expenses
export const getExpenses = async () => {
  const res = await API.get('/expenses');
  return res.data;
};
