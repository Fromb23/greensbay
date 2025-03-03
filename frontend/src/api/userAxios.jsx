import axios from "axios";

const userAxios = axios.create({
  baseURL: "http://localhost:5001/api/users",
  headers: {
    "Content-Type": "application/json",
  },
});

export default userAxios;