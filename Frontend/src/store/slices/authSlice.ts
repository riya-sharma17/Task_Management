import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: { name: "", email: "", _id: "" },
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = { name: "", email: "", _id: "" };
            state.isAuthenticated = false;
        },
    },
});

export const { setUserDetails, logout } = authSlice.actions;
export default authSlice.reducer;
