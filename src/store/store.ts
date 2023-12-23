import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import dialogReducer from "./slices/dialogSlice";
import electricyReducer from "./slices/electricySlice";
import gasReducer from "./slices/gasSlice";
import menuReducer from "./slices/menuSlice";
import meterReducer from "./slices/meterSlice";
import electricySettingsReducer from "./slices/settings/electricySettingsSlice";
import gasSettingsReducer from "./slices/settings/gasSettingsSlice";
import waterSettingsReducer from "./slices/settings/waterSettingsSlice";
import waterReducer from "./slices/waterSlice";

const settings = combineReducers({
  gas: gasSettingsReducer,
  electricity: electricySettingsReducer,
  water: waterSettingsReducer,
});

export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    menu: menuReducer,
    meter: meterReducer,
    settings: settings,
    gas: gasReducer,
    electricy: electricyReducer,
    water: waterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
