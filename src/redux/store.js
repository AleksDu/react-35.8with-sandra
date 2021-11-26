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
import { productAPpiSlice } from "./slices";
const authPersistCongig = {
  key: "authToken",
  storage,
  whitelist: ["token"],
};
const authPersistReducer = persistReducer(authPersistCongig, authReducer);
export const store = configureStore({
  reducer: {
    auth: authPersistReducer,
    [productAPpiSlice.reducerPath]: productAPpiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REGISTER, PAUSE, REHYDRATE, PERSIST, PURGE],
      },
    }).concat(productAPpiSlice.middleware),
});
export const persistor = persistStore(store);
