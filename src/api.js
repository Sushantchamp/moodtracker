import axios from 'axios';

// const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const base = import.meta.env.VITE_API_URL || 'https://moodtracker-backend.vercel.app/api';
const API = axios.create({
  baseURL: base,
  timeout: 9000
});

export default API;
