// import axios from 'axios';

// const FlaskAPI = axios.create({
//   baseURL: 'http://localhost:5001', // Flask server for /suggestions
// });

// export default FlaskAPI;

// frontend/lib/flaskApi.js
import axios from 'axios';

const FlaskAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PYTHON_BACKEND, // Python backend base URL
});

export default FlaskAPI;
