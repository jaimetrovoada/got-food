import { UserState } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  id: "",
  token: "",
  role: "",
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
      state.role = action.payload.role;
    },
    removeAuth: (state) => {
      state.name = "";
      state.email = "";
      state.id = "";
      state.token = "";
      state.role = "";
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
