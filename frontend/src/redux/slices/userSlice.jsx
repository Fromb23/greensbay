import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	user: null,
	error: null,
	userInfo: localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null,
  };
  
  const userSlice = createSlice({
	name: "user",
	error: null,
	loading: false,
	initialState,
	reducers: {
		USER_SIGNUP_REQUEST: (state) => {
			state.loading = true;
			state.error = null;
		},
		USER_SIGNUP_SUCCESS: (state, action) => {
			state.loading = false;
			state.user = action.payload;
			state.error = null;
		},
		USER_SIGNUP_FAILURE: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		USER_LOGIN_REQUEST: (state) => {
			state.loading = true;
			state.error = null;
		},
		USER_LOGIN_SUCCESS: (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			console.log("userSlice...", action.payload.user);
			localStorage.setItem("token", JSON.stringify({
				token: action.payload.token
			}));
			localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
			state.error = null;
			setTimeout(() => {
				window.location.reload();
				}, 100);
			},
		USER_LOGIN_FAILURE: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			console.log("State error:", state.error);
		},
		logout: (state) => {
			state.user = null;
			state.loading = false;
			state.error = null;
			localStorage.removeItem("userInfo");
			localStorage.removeItem("token");
			localStorage.removeItem("cartItems");
		},
	},
});
  
  export const { 
	USER_SIGNUP_REQUEST,
	USER_SIGNUP_SUCCESS,
	USER_SIGNUP_FAILURE,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	logout,
	} = userSlice.actions;
  export default userSlice.reducer;  