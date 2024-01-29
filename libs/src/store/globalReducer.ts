/* eslint-disable @typescript-eslint/no-explicit-any */
import { userReducer, userState } from "./user";
import { authReducer, authState } from "./auth";
import { useReducer } from "react";

const rootReducer = (state: any, action: any) => ({
  auth: authReducer(state.auth, action),
  user: userReducer(state.user, action),
});

const initialState = {
  auth: authState,
  user: userState,
};

export const useAppReducer = () => useReducer(rootReducer, initialState);
