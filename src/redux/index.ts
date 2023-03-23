import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
// import usersReducer from "./reducers/usersReducer";
import craftSlice from "./reducers/craftSlice";

// Automatically adds the thunk middleware and the Redux DevTools extension
const rootReducer = combineReducers({
  craft: craftSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof rootReducer>;
