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

export const electricitySlice = createSlice({
  name: "electricity",
  initialState,
  reducers: {
    setElectricityMeters(state, action) {
      state.meters = action.payload;
    },
    setElectricitySampledMeters: (state, action) => {
      state.sampledMeters = action.payload;
    },
    setElectricityStats: (state, action) => {
      state.stats = action.payload;
    },
    setElectricityExpenses: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const {
  setElectricityMeters,
  setElectricitySampledMeters,
  setElectricityStats,
  setElectricityExpenses,
} = electricitySlice.actions;

export default electricitySlice.reducer;
