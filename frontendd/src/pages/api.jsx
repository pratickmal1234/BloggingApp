import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8003/user",
    withCredentials: true
});

export default api;