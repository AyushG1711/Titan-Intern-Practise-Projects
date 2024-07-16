import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  Priority,
  Status,
  DueDate,
  FilterState,
} from "../../../shared/types/filter";
import { AppDispatch } from "../store";
import { bridge } from "../../../shared/bridge";
import { deepCopy } from "../../../shared/deepCopy";
import { EVENT } from "../../../shared/constants/events";
const initialState: FilterState = {
  priority: [],
  status: [],
  dueDate: null,
  sortBy: null,
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPriority(prevState: FilterState, action: PayloadAction<Priority>) {
      prevState.priority.push(action.payload);
    },
    unsetPriority(prevState: FilterState, action: PayloadAction<Priority>) {
      prevState.priority = prevState.priority.filter((val) => {
        return val !== action.payload;
      });
    },
    setStatus(prevState: FilterState, action: PayloadAction<Status>) {
      prevState.status.push(action.payload);
    },
    unsetStatus(prevState: FilterState, action: PayloadAction<Status>) {
      prevState.status = prevState.status.filter((val) => {
        return val !== action.payload;
      });
    },
    setDate(prevState: FilterState, action: PayloadAction<DueDate>) {
      prevState.dueDate = action.payload;
    },
    unsetDate(prevState: FilterState) {
      prevState.dueDate = null;
    },
    setSortBy(prevState: FilterState, action: PayloadAction<string | null>) {
      prevState.sortBy = action.payload;
    },
    setFilters(prevState: FilterState, action: PayloadAction<FilterState>) {
      const { priority, status, dueDate, sortBy } = action.payload;
      prevState.priority = deepCopy(priority);
      prevState.status = deepCopy(status);
      prevState.dueDate = dueDate ? deepCopy(dueDate) : null;
      prevState.sortBy = sortBy;
    },
    clearAll(prevState: FilterState) {
      prevState.dueDate = null;
      prevState.priority = [];
      prevState.status = [];
      prevState.sortBy = null;
    },
  },
});
export const applyFiltersActionCreator = () => {
  return (dispatch: AppDispatch, getState: any) => {
    bridge.emit(EVENT.APPLY_FILTERS, getState().filter);
  };
};
export const reviveFiltersFromLS = () => {
  return (dispatch: AppDispatch, getState: any) => {
    bridge.emit(EVENT.REVIVE_FILTERS, []);
  };
};
export default filterSlice.reducer;
export const {
  setPriority,
  unsetPriority,
  setStatus,
  unsetStatus,
  setDate,
  unsetDate,
  clearAll,
  setFilters,
  setSortBy,
} = filterSlice.actions;
