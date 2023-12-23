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

export const gasSlice = createSlice({
  name: "gas",
  initialState,
  reducers: {
    setGasSampledMeters: (state, action) => {
      state.sampledMeters = action.payload;
    },
    setGasStats: (state, action) => {
      state.stats = action.payload;
    },
    setGasExpenses: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const { setGasSampledMeters, setGasStats, setGasExpenses } =
  gasSlice.actions;

export default gasSlice.reducer;
