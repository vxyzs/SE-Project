import axios from 'axios';

const Instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Change to your backend URL
    withCredentials: true, // Important for sending cookies
});

export default Instance;
