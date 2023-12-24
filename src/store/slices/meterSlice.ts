import { createSlice } from "@reduxjs/toolkit";

interface MeterState {
  lastUpdateTime: number;
}

const initialState: MeterState = {
  lastUpdateTime: 0,
};

export const meterSlice = createSlice({
  name: "meters",
  initialState,
  reducers: {
    setLastUpdateTime: (state, action) => {
      state.lastUpdateTime = action.payload;
    },
  },
});

export const { setLastUpdateTime } = meterSlice.actions;

export default meterSlice.reducer;
