import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3333/', // Substitua pela URL da sua API
    timeout: 10000,
    withCredentials: false,
    headers: {
        "Content-type": "application/json"
    }
});

