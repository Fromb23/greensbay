import axios from "axios";

const adminAxios = axios.create({
  baseURL: "http://localhost:5001/api/admin",
  headers: {
    "Content-Type": "application/json",
  },
});

export default adminAxios;