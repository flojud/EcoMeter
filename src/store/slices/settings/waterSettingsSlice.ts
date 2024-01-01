import { createSlice } from "@reduxjs/toolkit";
import { IWaterSettingsState } from "../../../interfaces/Types";

const initialState: IWaterSettingsState = {
  squareMeters: 125,
  consumption: 0,
  basicMonthCharge: 1.2,
  cubicMeterCharge: 2.63,
  sewageCubicMeterCharge: 1.5,
  rainwaterFee: 0.33,
};

export const waterSettingsSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    setSquareMeters: (state, action) => {
      state.squareMeters = action.payload;
    },
    setConsumption: (state, action) => {
      state.consumption = action.payload;
    },
    setBasicMonthCharge: (state, action) => {
      state.basicMonthCharge = action.payload;
    },
    setCubicMeterCharge: (state, action) => {
      state.cubicMeterCharge = action.payload;
    },
    setSewageCubicMeterCharge: (state, action) => {
      state.sewageCubicMeterCharge = action.payload;
    },
    setRainwaterFee: (state, action) => {
      state.rainwaterFee = action.payload;
    },
  },
});

export const {
  setSquareMeters,
  setConsumption,
  setBasicMonthCharge,
  setCubicMeterCharge,
  setSewageCubicMeterCharge,
  setRainwaterFee,
} = waterSettingsSlice.actions;

export default waterSettingsSlice.reducer;
