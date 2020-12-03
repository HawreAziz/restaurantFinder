import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import reducers from "../reducers";
import { persistReducer, persistStore } from "redux-persist";
import { AsyncStorage } from "react-native";

// persist config
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["likedJobs"],
};

// create persistReducer
const persistedReducer = persistReducer(persistConfig, reducers);

// persistStore

export default () => {
  const store = createStore(persistedReducer, applyMiddleware(Thunk));
  const persistor = persistStore(store);
  return { store, persistor };
};
