import { createSlice } from "@reduxjs/toolkit";

interface MenuState {
  item: number;
}

const initialState: MenuState = {
  item: 0,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { setItem } = menuSlice.actions;

export default menuSlice.reducer;
