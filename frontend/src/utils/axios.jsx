import axios from 'axios';

const Instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`, // Change to your backend URL
    withCredentials: true, // Important for sending cookies
});

export default Instance;
