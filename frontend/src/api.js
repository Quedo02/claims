// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3500', // Cambia a la URL de tu backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;