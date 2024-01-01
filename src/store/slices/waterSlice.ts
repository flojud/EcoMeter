import { createSlice } from "@reduxjs/toolkit";
import {
  IConsumption,
  IConsumptionStats,
  IExpenseEstimate,
  IMeter,
} from "../../interfaces/Types";

interface MeterState {
  meters: IMeter[] | null;
  sampledMeters: IConsumption[] | null;
  stats: IConsumptionStats | null;
  expenses: IExpenseEstimate | null;
}

const initialState: MeterState = {
  meters: null,
  sampledMeters: null,
  stats: null,
  expenses: null,
};

export const waterReducer = createSlice({
  name: "water",
  initialState,
  reducers: {
    setWaterMeters(state, action) {
      state.meters = action.payload;
    },
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

export const {
  setWaterMeters,
  setWaterSampledMeters,
  setWaterStats,
  setWaterExpenses,
} = waterReducer.actions;

export default waterReducer.reducer;
