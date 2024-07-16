import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../../shared/types/task";
export type modalType = { show: boolean; taskToBeUpdated: Task | null };
const initialState: modalType = {
  show: false,
  taskToBeUpdated: null,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal(prevState, action) {
      prevState.show = action.payload;
    },
    setTaskToBeUpdated(prevState, action: PayloadAction<Task | null>) {
      if (action.payload === null) prevState.taskToBeUpdated = null;
      else prevState.taskToBeUpdated = { ...action.payload };
    },
  },
});
export const { setModal, setTaskToBeUpdated } = modalSlice.actions;
export default modalSlice.reducer;
