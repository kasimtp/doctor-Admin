import axios from "axios";


const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const apiClient = axios.create({
    baseURL:baseUrl,
});