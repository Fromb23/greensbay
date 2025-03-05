import adminAxios from "../../api/adminAxios";

export const createAdmin = async (adminData) => {
  try {
    const response = await adminAxios.post("/create-admin", adminData);
    console.log("Response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error.response?.data || "Server Error";
  }
};

export const signInAdmin = async (signInData) => {
  try {
	const response = await adminAxios.post("/login", signInData);
	console.log(response.data);
	return response.data;
  } catch (error) {
	console.error("Error signing in admin:", error);
	throw error.response?.data || "Server Error";
  }
};