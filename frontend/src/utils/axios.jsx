import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://se-project-e9zy.onrender.com/api', // Change to your backend URL
    withCredentials: true, // Important for sending cookies
});

export default instance;
