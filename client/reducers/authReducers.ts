import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
  email: string;
  id: string;
  token: string;
}

const initialState = {
  name: "",
  email: "",
  id: "",
  token: "",
};
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    removeAuth: (state) => {
      state.name = "";
      state.email = "";
      state.id = "";
      state.token = "";
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
