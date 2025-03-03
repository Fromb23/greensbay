import userAxios from "../../api/userAxios";
import { USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE } from "../slices/userSlice";


export const createUser = (signupForm) => async (dispatch) => {
  try {
    dispatch(USER_SIGNUP_REQUEST());
    const response = await userAxios.post("/signup", signupForm);
    
    dispatch(USER_SIGNUP_SUCCESS(response.data));
  } catch (error) {
    dispatch({ 
      type: "USER_SIGNUP_FAILURE", 
      payload: error.response?.data || "Server Error" 
    });
  }
};

export const login = (loginForm) => async (dispatch) => {
  try {
    dispatch(USER_LOGIN_REQUEST());
    const response = await userAxios.post("/login", loginForm); 
    dispatch(USER_LOGIN_SUCCESS(response.data));
  } catch (error) {
    const errorMessage = error.response?.data || "Server Error";
    dispatch(USER_LOGIN_FAILURE(errorMessage.message));
    return errorMessage;
  }
}

export const updateCustomerDetails = async (customerDetails) => {
	  try {
	const response = await userAxios.put("/update-customer", customerDetails);
	return response.data;
  } catch (error) {
	console.error("Error updating customer details:", error);
	throw error.response?.data || "Server Error";
  }
};

export const getCustomerDetails = () => async () => {
  try {
	const response = await userAxios.get("/get-customer");
	return response.data;
  } catch (error) {
	console.error("Error getting customer details:", error);
	throw error.response?.data || "Server Error";
  }
};