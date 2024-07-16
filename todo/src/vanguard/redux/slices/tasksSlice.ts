import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tasks } from "../../../shared/types/tasks";
import { Task } from "../../../shared/types/task";
import { AppDispatch } from "../store";
import { bridge } from "../../../shared/bridge";
import { EVENT } from "../../../shared/constants/events";
import { shouldInclude } from "../../components/Tasks/TaskList";
export type TasksState = { tasks: Tasks };
const initialState: TasksState = { tasks: [] };

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(prevState: TasksState, action: PayloadAction<Task>) {
      prevState.tasks.push(action.payload);
    },
    updateTask(prevState: TasksState, action: PayloadAction<Task>) {
      prevState.tasks = prevState.tasks.map((task) => {
        if (task.id === action.payload.id) {
          task = JSON.parse(JSON.stringify(action.payload));
        }
        return task;
      });
    },
    deleteTask(prevState: TasksState, action: PayloadAction<string>) {
      prevState.tasks = prevState.tasks.filter((task) => {
        return task.id !== action.payload;
      });
    },
    updateTaskList(prevState: TasksState, action: PayloadAction<Tasks>) {
      prevState.tasks = JSON.parse(JSON.stringify(action.payload));
    },
  },
});
export const addTaskActionCreator = (task: Task) => {
  return (dispatch: AppDispatch, getState: any) => {
    dispatch(addTask(task)); //OPTIMISTIC UPD
    bridge.emit(EVENT.ADD_TASK, task);
  };
};
export const updateTaskActionCreator = (task: { old: Task; new: Task }) => {
  return (dispatch: AppDispatch, getState: any) => {
    const { priority, status, dueDate } = getState().filter;
    shouldInclude(task.new, priority, status, dueDate)
      ? dispatch(updateTask(task.new))
      : dispatch(deleteTask(task.new.id));

    bridge.emit(EVENT.UPDATE_TASK, task);
  };
};
export const deleteTaskActionCreator = (task: Task) => {
  return (dispatch: AppDispatch) => {
    dispatch(deleteTask(task.id));
    bridge.emit(EVENT.DELETE_TASK, task);
  };
};
export const { addTask, deleteTask, updateTask, updateTaskList } =
  tasksSlice.actions;
export default tasksSlice.reducer;
