import { createSlice } from "@reduxjs/toolkit";
import { IElectricitySettingsState } from "../../../interfaces/Types";

const initialState: IElectricitySettingsState = {
  consumptionType: "",
  consumption: 4250,
  workingPrice: 32.36,
  basicPrice: 19.17,
  contractDate: null,
  runtime: 12,
};

export const electricitySettingsSlice = createSlice({
  name: "electricity",
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
} = electricitySettingsSlice.actions;

export default electricitySettingsSlice.reducer;
