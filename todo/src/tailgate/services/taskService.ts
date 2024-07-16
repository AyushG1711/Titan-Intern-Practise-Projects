import { bridge } from "../../shared/bridge";
import { Task } from "../../shared/types/task";
import { addTaskAPI } from "../api/addTaskAPI";
import { addTaskToIDB } from "../repo/addTaskToIDB";
import { deleteTaskAPI } from "../api/deleteTaskAPI";
import { deleteTaskFromIDB } from "../repo/deleteTaskFromIDB";
import { updateTaskAPI } from "../api/updateTaskAPI";
import { updateTaskToIDB } from "../repo/updateTaskToIDB";
import { EVENT } from "../../shared/constants/events";
import { filterService } from "./filterService";
import { store } from "../../vanguard/redux/store";

class TaskService {
  async add(task: Task) {
    try {
      await addTaskAPI(task);
      await addTaskToIDB(task);
      await filterService.apply(store.getState().filter);
    } catch (err) {
      bridge.emit(EVENT.REVERT_ADD_TASK, task.id);
      bridge.emit(EVENT.FAILURE, "Task could not be added");
    }
  }
  async delete(task: Task) {
    try {
      await deleteTaskAPI(task.id);
      await deleteTaskFromIDB(task.id);
    } catch (err) {
      bridge.emit(EVENT.REVERT_DELETE_TASK, task);
      bridge.emit(EVENT.FAILURE, "Task could not be deleted");
    }
  }
  async update(task: { old: Task; new: Task }) {
    try {
      await updateTaskAPI(task.new);
      await updateTaskToIDB(task.new);
      await filterService.apply(store.getState().filter);
    } catch (err) {
      bridge.emit(EVENT.REVERT_UPDATE_TASK, task.old);
      bridge.emit(EVENT.FAILURE, "Task could not be updated");
    }
  }
}
export const taskService = new TaskService();
