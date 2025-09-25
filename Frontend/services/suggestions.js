import FlaskAPI from '../lib/flaskApi';

// Get suggestions
export const getSuggestions = async (expenses) => {
  const res = await FlaskAPI.post('/suggestions', { expenses });
  return res.data;
};

// Generate report
export const generateReport = async (data) => {
  const res = await FlaskAPI.post('/reports/generate', data);
  return res.data;
};
