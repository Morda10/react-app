import logger from "redux-logger";
import rootReducer from "./reducers/rootReducer";
import { persistStore } from "redux-persist";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";

const defaultMiddleware = getDefaultMiddleware({ serializableCheck: false });
const middleware = [...defaultMiddleware, logger];
// const middleware = [...defaultMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export const persistor = persistStore(store); // cache store

export default { store, persistor };
