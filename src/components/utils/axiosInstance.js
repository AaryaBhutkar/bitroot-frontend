import axios from 'axios';

// Create Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set up request interceptor to add authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
