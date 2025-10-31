import axios from "axios";

const api = axios.create({
  baseURL: "https://resuai-ylvj.onrender.com",
  withCredentials: true, // Set to true if using cookies
});

export default api;


