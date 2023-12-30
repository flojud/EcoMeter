import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import appReducer from "./slices/appSlice";
import dialogReducer from "./slices/dialogSlice";
import electricityReducer from "./slices/electricitySlice";
import gasReducer from "./slices/gasSlice";
import menuReducer from "./slices/menuSlice";
import electricitySettingsReducer from "./slices/settings/electricitySettingsSlice";
import gasSettingsReducer from "./slices/settings/gasSettingsSlice";
import waterSettingsReducer from "./slices/settings/waterSettingsSlice";
import waterReducer from "./slices/waterSlice";

const settings = combineReducers({
  gas: gasSettingsReducer,
  electricity: electricitySettingsReducer,
  water: waterSettingsReducer,
});

export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    menu: menuReducer,
    app: appReducer,
    settings: settings,
    gas: gasReducer,
    electricity: electricityReducer,
    water: waterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
