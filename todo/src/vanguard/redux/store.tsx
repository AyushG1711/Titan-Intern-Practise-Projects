import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import tasksReducer from "./slices/tasksSlice";
import modalReducer from "./slices/modalSlice";
export const store = configureStore({
  reducer: { filter: filterReducer, tasks: tasksReducer, modal: modalReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
