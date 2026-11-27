import { api } from "@/services/api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterReducer from "./reducer/filter"
import formCreateReducer from "./reducer/formCreate"
import storage from "./storage";
import persistReducer from "redux-persist/lib/persistReducer";
import { FLUSH } from "redux-persist/es/constants";
import { REGISTER, REHYDRATE } from "redux-persist/lib/constants";
import { PAUSE, PERSIST, PURGE } from "redux-persist";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  filter: filterReducer,
  formCreate: formCreateReducer,
})

const persistentConfig = {
  key: "root",
  storage,
  whitelist: ['formCreate']
}

export const makeStore = () => configureStore({
  reducer: persistReducer(persistentConfig, rootReducer),
  middleware: (getDefault) => getDefault({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }).concat(api.middleware)
})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
