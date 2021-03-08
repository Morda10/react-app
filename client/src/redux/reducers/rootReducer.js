import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // for local storage use
import { UserReducer } from "./UserReducer";
//or
// import storageSession from 'redux-persist/lib/storage/session' // for session storage

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["rootReducer"], // only rootReducer will be persisted
};

const rootReducer = UserReducer;

export default persistReducer(persistConfig, rootReducer);
