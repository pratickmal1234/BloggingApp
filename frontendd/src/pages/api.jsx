import axios from "axios";

const api = axios.create({
    baseURL: "https://bloggingapp-2.onrender.com/user",
    withCredentials: true
});

export default api;