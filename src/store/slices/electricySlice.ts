import { createSlice } from "@reduxjs/toolkit";
import {
  IConsumption,
  IConsumptionAvg,
  IExpenseEstimate,
  IMeter,
} from "../../interfaces/Types";

interface MeterState {
  meters: IMeter[] | null;
  sampledMeters: IConsumption[] | null;
  stats: IConsumptionAvg | null;
  expenses: IExpenseEstimate | null;
}

const initialState: MeterState = {
  meters: null,
  sampledMeters: null,
  stats: null,
  expenses: null,
};

export const electricySlice = createSlice({
  name: "electricy",
  initialState,
  reducers: {
    setElectricyMeters(state, action) {
      state.meters = action.payload;
    },
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
  setElectricyMeters,
  setElectricySampledMeters,
  setElectricyStats,
  setElectricyExpenses,
} = electricySlice.actions;

export default electricySlice.reducer;
