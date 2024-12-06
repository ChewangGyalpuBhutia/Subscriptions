import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tranform-automation-pvt-limited.vercel.app/api',
});

export default api;