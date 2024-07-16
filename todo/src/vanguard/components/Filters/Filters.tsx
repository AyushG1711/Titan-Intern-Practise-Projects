import "./Filters.css";
import CheckboxLabels from "./CheckBoxLabels";
import {
  priorityOptions,
  statusOptions,
  sortingOptions,
} from "../../../shared/constants/filters";
import {
  setPriority,
  unsetPriority,
  setStatus,
  unsetStatus,
  setDate,
  unsetDate,
  clearAll,
  applyFiltersActionCreator,
  setSortBy,
} from "../../redux/slices/filterSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Priority, Status } from "../../../shared/types/filter";
import DatePicker from "./DatePicker";
import { priorityColors } from "../Tasks/Task";
const Filters = () => {
  const dispatch = useAppDispatch();
  const { priority, status, dueDate, sortBy } = useAppSelector(
    (store) => store.filter
  );
  const handler = {
    selectPriorityHandler: (key: Priority) => {
      dispatch(setPriority(key));
    },
    unSelectPriorityHandler: (key: Priority) => {
      dispatch(unsetPriority(key));
    },
    selectStatusHandler: (key: Status) => {
      dispatch(setStatus(key));
    },
    unSelectStatusHandler: (key: Status) => {
      dispatch(unsetStatus(key));
    },
    setDateHandler: (date: number, month: number, year: number) => {
      dispatch(setDate({ date, month, year }));
    },
    clearDateHandler: () => {
      dispatch(unsetDate());
    },
    selectSortingHandler: (key: string) => {
      dispatch(setSortBy(key));
    },
    clearAllHandler: () => {
      dispatch(clearAll());
      dispatch(applyFiltersActionCreator());
    },
    applyFilters() {
      dispatch(applyFiltersActionCreator());
    },
  };
  return (
    <div className="filters">
      <div className="heading">Apply Filters </div>
      <div className="priority-filter filter">
        <div className="title">Select Priority</div>
        <CheckboxLabels
          options={priorityOptions}
          onSelect={handler.selectPriorityHandler}
          onUnselect={handler.unSelectPriorityHandler}
          state={priority}
          colors={priorityColors}
        />
      </div>
      <div className="status-filter filter">
        <div className="title">Select Status</div>
        <CheckboxLabels
          options={statusOptions}
          onSelect={handler.selectStatusHandler}
          onUnselect={handler.unSelectStatusHandler}
          state={status}
          colors={priorityColors}
        />
      </div>
      <div className="due-date-filter filter">
        <div className="title">Select Due Date</div>
        <DatePicker
          value={dueDate}
          setDateHandler={handler.setDateHandler}
          clearDateHandler={handler.clearDateHandler}
        />
      </div>
      <div className="sorting-options filter">
        <div className="title">Sort By</div>
        <CheckboxLabels
          options={sortingOptions}
          onSelect={handler.selectSortingHandler}
          state={sortBy ? [sortBy] : []}
          colors={priorityColors}
        />
      </div>
      <div className="action-btn">
        <div className="clear-all">
          <button onClick={handler.clearAllHandler}>Clear All</button>
        </div>
        <div className="submit">
          <button onClick={handler.applyFilters}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
};
export default Filters;
