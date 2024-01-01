import { createSlice } from "@reduxjs/toolkit";

interface FeedbackState {
  openAddMeterForm: boolean;
  openGasTableForm: boolean;
  openElectricityTableForm: boolean;
  openWaterTableForm: boolean;
  openImportMeterForm: boolean;
}

const initialState: FeedbackState = {
  openAddMeterForm: false,
  openGasTableForm: false,
  openElectricityTableForm: false,
  openWaterTableForm: false,
  openImportMeterForm: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setOpenMeterForm: (state, actions) => {
      state.openAddMeterForm = actions.payload;
    },
    setOpenGasTableForm: (state, actions) => {
      state.openGasTableForm = actions.payload;
    },
    setOpenElectricityTableForm: (state, actions) => {
      state.openElectricityTableForm = actions.payload;
    },
    setOpenWaterTableForm: (state, actions) => {
      state.openWaterTableForm = actions.payload;
    },
    setOpenImportMeterForm: (state, actions) => {
      state.openImportMeterForm = actions.payload;
    },
  },
});

export const {
  setOpenMeterForm,
  setOpenGasTableForm,
  setOpenElectricityTableForm,
  setOpenWaterTableForm,
  setOpenImportMeterForm,
} = dialogSlice.actions;

export default dialogSlice.reducer;
