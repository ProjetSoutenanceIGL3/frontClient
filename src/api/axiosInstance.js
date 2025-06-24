import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/API", // URL du backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
