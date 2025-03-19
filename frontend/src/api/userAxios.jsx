import axios from "axios";

const userAxios = axios.create({
  baseURL: "http://localhost:5001/api/users",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

userAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          "http://localhost:5000/api/users/refresh",
          {},
          { withCredentials: true } 
        );

        const newAccessToken = refreshResponse.data.accessToken;

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return userAxios(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default userAxios;