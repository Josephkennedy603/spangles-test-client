import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  todo: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateTodo: (state, action) => {
      state.todo = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { updateTodo, updateUser } = appSlice.actions;
