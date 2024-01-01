import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  lastUpdateTime: number;
  animation: boolean;
}

const initialState: AppState = {
  lastUpdateTime: 0,
  animation: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLastUpdateTime: (state, action) => {
      state.lastUpdateTime = action.payload;
    },
    setAnimation: (state, action) => {
      state.animation = action.payload;
    },
  },
});

export const { setLastUpdateTime, setAnimation } = appSlice.actions;

export default appSlice.reducer;
