import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api', // Change to your backend URL
    withCredentials: true, // Important for sending cookies
});

export default instance;
