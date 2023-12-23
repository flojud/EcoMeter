import { createSlice } from "@reduxjs/toolkit";
import {
  IConsumption,
  IConsumptionAvg,
  IExpenseEstimate,
} from "../../interfaces/Types";

interface MeterState {
  sampledMeters: IConsumption[] | null;
  stats: IConsumptionAvg | null;
  expenses: IExpenseEstimate | null;
}

const initialState: MeterState = {
  sampledMeters: null,
  stats: null,
  expenses: null,
};

export const waterReducer = createSlice({
  name: "water",
  initialState,
  reducers: {
    setWaterSampledMeters: (state, action) => {
      state.sampledMeters = action.payload;
    },
    setWaterStats: (state, action) => {
      state.stats = action.payload;
    },
    setWaterExpenses: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const { setWaterSampledMeters, setWaterStats, setWaterExpenses } =
  waterReducer.actions;

export default waterReducer.reducer;
