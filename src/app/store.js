import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import cartSlice from "./features/cartSlice";
import globalSlice from "./features/globalSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productsApiSlice } from "./services/apiSlice";
import networkSlice from "./features/networkSlice";

const persistCartConfig = {
  key: "cart",
  storage,
};
const persistedCart = persistReducer(persistCartConfig, cartSlice);

export const store = configureStore({
  reducer: {
    network: networkSlice,
    login: loginSlice,
    cart: persistedCart,
    global: globalSlice,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat([productsApiSlice.middleware]),
});

export const persister = persistStore(store);
