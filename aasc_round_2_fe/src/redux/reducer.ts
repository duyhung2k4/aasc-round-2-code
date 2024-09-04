import authSlice from "./slice/authSlice";
import contactSlice from "./slice/contactSlice";

import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import { userApi } from "./api/user";
import { contactApi } from "./api/contact";
import { requisitetApi } from "./api/requisite";
import { bankApi } from "./api/bank";



export const rootReducer = combineReducers({
    authSlice: authSlice.reducer,
    contactSlice: contactSlice.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [requisitetApi.reducerPath]: requisitetApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [bankApi.reducerPath]: bankApi.reducer,
})