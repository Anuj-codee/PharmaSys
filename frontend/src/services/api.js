import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pharmasys-cqzl.onrender.com/' || 'http://localhost:5000/api', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;