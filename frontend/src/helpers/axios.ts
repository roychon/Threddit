import axios from 'axios';

// the axios instance we'll work with
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export default axiosInstance;
