import axios, { AxiosInstance } from 'axios';

const Instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3500', 
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default Instance;
