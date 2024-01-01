import { createSlice } from "@reduxjs/toolkit";
import {
  IConsumption,
  IConsumptionStats,
  IExpenseEstimate,
  IMeter,
} from "../../interfaces/Types";

interface MeterState {
  meters: IMeter[] | null; //m3
  metersKWh: IMeter[] | null;
  sampledMeters: IConsumption[] | null;
  stats: IConsumptionStats | null;
  expenses: IExpenseEstimate | null;
}

const initialState: MeterState = {
  meters: null,
  metersKWh: null,
  sampledMeters: null,
  stats: null,
  expenses: null,
};

export const gasSlice = createSlice({
  name: "gas",
  initialState,
  reducers: {
    setGasMeters(state, action) {
      state.meters = action.payload;
    },
    setGasMetersKWh(state, action) {
      state.metersKWh = action.payload;
    },
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

export const {
  setGasMeters,
  setGasMetersKWh,
  setGasSampledMeters,
  setGasStats,
  setGasExpenses,
} = gasSlice.actions;

export default gasSlice.reducer;
