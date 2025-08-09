import axios, { AxiosError } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Create an instance of Axios
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add a request interceptor

// redirect to login if any request returns 401
api.interceptors.request.use(
  (config) => {
    // Retrieve the bearer token from localStorage
    const token = '1234567890';

    if (token) {
      // Set the Authorization header with the bearer token
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Abort the request if the token is not available
      // window.location.href = '/login'
      return Promise.reject(new Error('Token not available'));
    }

    return config;
  },
  (error) => Promise.reject(error)
);
// Response interceptor to handle 401 Unauthorized responses
api.interceptors.response.use(
  (response) => response, // On success do nothing
  (error: AxiosError) => {
    // Check if it's a 401 error
    if (error.response && error.response.status === 401) {
      // Redirect to the login page or emit an event to do so
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;
