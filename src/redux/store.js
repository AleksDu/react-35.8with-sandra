import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REGISTER,
  PAUSE,
  REHYDRATE,
  PERSIST,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const authPersistCongig = {
  key: "authToken",
  storage,
  whitelist: ["token"],
};
const authPersistReducer = persistReducer(authPersistCongig, authReducer);
export const store = configureStore({
  reducer: {
    auth: authPersistReducer,
  },
  middleware: (getDefaultMiddlaware) =>
    getDefaultMiddlaware({
      serializableCheck: {
        ignoredActions: [FLUSH, REGISTER, PAUSE, REHYDRATE, PERSIST, PURGE],
      },
    }),
});
export const persistor = persistStore(store);
