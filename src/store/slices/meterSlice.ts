import { createSlice } from "@reduxjs/toolkit";
import { IMeter } from "../../interfaces/Types";

interface MeterState {
  meters: IMeter[] | null;
  lastUpdateTime: number;
}

const initialState: MeterState = {
  meters: null,
  lastUpdateTime: 0,
};

export const meterSlice = createSlice({
  name: "meters",
  initialState,
  reducers: {
    setMeters: (state, action) => {
      state.meters = action.payload;
    },
    setLastUpdateTime: (state, action) => {
      state.lastUpdateTime = action.payload;
    },
  },
});

export const { setMeters, setLastUpdateTime } = meterSlice.actions;

export default meterSlice.reducer;
