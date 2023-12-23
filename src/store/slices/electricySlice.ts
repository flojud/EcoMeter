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

export const electricySlice = createSlice({
  name: "electricy",
  initialState,
  reducers: {
    setElectricySampledMeters: (state, action) => {
      state.sampledMeters = action.payload;
    },
    setElectricyStats: (state, action) => {
      state.stats = action.payload;
    },
    setElectricyExpenses: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const {
  setElectricySampledMeters,
  setElectricyStats,
  setElectricyExpenses,
} = electricySlice.actions;

export default electricySlice.reducer;
