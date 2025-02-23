import axios from "axios";

const productAxios = axios.create({
  baseURL: "http://localhost:5001/api/products",
  headers: {
    "Content-Type": "application/json",
  },
});

export default productAxios;