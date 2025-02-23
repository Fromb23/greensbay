import axiosInstance from "../../api/axiosInstance";

export const createAdmin = async (adminData) => {
  try {
    const response = await axiosInstance.post("/create-admin", adminData);
    return response.data;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error.response?.data || "Server Error";
  }
};

export const signInAdmin = async (signInData) => {
  try {
	const response = await axiosInstance.post("/login", signInData);
	console.log(response.data);
	return response.data;
  } catch (error) {
	console.error("Error signing in admin:", error);
	throw error.response?.data || "Server Error";
  }
};