import axios from 'axios';

// Set the base URL for all API requests
const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Add Authorization header for requests requiring authentication
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req;
});

// Authentication APIs
export const signup = (formData) => API.post('/api/auth/signup', formData);
export const login = (formData) => API.post('/api/auth/login', formData);

// User APIs
export const fetchAgents = () => API.get('/api/users/agents');
export const fetchAgentProfile = (id) => API.get(`/api/users/agents/${id}`);
export const fetchUserProfile = () => API.get('/api/users/profile');
export const updateUserProfile = (formData) => API.put('/api/users/profile', formData);
export const deleteUserProfile = (id) => API.delete(`/api/users/profile/${id}`);
