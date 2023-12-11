import { createSlice } from "@reduxjs/toolkit";
import { IGasSettingsState } from "../../../interfaces/Types";

const initialState: IGasSettingsState = {
  consumptionType: "",
  consumption: 18000,
  workingPrice: 9.26,
  basicPrice: 11.91,
  contractDate: null,
  runtime: 12,
};

export const gasSettingsSlice = createSlice({
  name: "gas",
  initialState,
  reducers: {
    setConsumptionType: (state, action) => {
      state.consumptionType = action.payload;
    },
    setConsumption: (state, action) => {
      state.consumption = action.payload;
    },
    setWorkingPrice: (state, action) => {
      state.workingPrice = action.payload;
    },
    setBasicPrice: (state, action) => {
      state.basicPrice = action.payload;
    },
    setContractDate: (state, action) => {
      state.contractDate = action.payload;
    },
    setRuntime: (state, action) => {
      state.runtime = action.payload;
    },
  },
});

export const {
  setConsumptionType,
  setConsumption,
  setWorkingPrice,
  setBasicPrice,
  setContractDate,
  setRuntime,
} = gasSettingsSlice.actions;

export default gasSettingsSlice.reducer;
