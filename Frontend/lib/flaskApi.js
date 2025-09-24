import axios from 'axios';

const FlaskAPI = axios.create({
  baseURL: 'http://localhost:5001', // Flask server for /suggestions
});

export default FlaskAPI;
