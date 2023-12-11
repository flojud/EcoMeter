import { createSlice } from "@reduxjs/toolkit";
import { IElectricySettingsState } from "../../../interfaces/Types";

const initialState: IElectricySettingsState = {
  consumptionType: "",
  consumption: 4250,
  workingPrice: 32.36,
  basicPrice: 19.17,
  contractDate: null,
  runtime: 12,
};

export const electricySettingsSlice = createSlice({
  name: "electricy",
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
} = electricySettingsSlice.actions;

export default electricySettingsSlice.reducer;
