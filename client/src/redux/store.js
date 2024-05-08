import { configureStore } from "@reduxjs/toolkit";
import necesarSlice from "./slices/necesarSlice";
import predareSlice from "./slices/predareSlice";
import echipSlice from "./slices/echipSlice";
import returSlice from "./slices/returSlice";
import locationsSlice from "./slices/locationsSlice";
import inventarSlice from "./slices/inventarSlice";
import loginSlice from "./slices/usersSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import mobilePhonesSlice from "./slices/mobilePhonesSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["loggedUser"],
};

const persistedReducer = persistReducer(persistConfig, loginSlice);

const store = configureStore({
  reducer: {
    necesar: necesarSlice,
    predare: predareSlice,
    echipament: echipSlice,
    retur: returSlice,
    users: persistedReducer,
    locatii: locationsSlice,
    inventar: inventarSlice,
    telefoane: mobilePhonesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
