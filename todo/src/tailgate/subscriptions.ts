import { bridge } from "../shared/bridge";
import { FilterState } from "../shared/types/filter";
import { Task } from "../shared/types/task";
import { taskService } from "./services/taskService";
import { filterService } from "./services/filterService";
import { updateLocalStorage } from "./services/updateLocalStorage";
import { EVENT } from "../shared/constants/events";

export default function registerTGSubscriptions() {
  return [
    bridge.subscribe(EVENT.ADD_TASK, (task: Task) => {
      taskService.add(task);
    }),
    bridge.subscribe(EVENT.UPDATE_TASK, (task: { old: Task; new: Task }) => {
      taskService.update(task);
    }),
    bridge.subscribe(EVENT.DELETE_TASK, (task: Task) => {
      taskService.delete(task);
    }),
    bridge.subscribe(EVENT.APPLY_FILTERS, (filters: FilterState) => {
      updateLocalStorage(filters);
      filterService.apply(filters);
    }),
    bridge.subscribe(EVENT.REVIVE_FILTERS, () => {
      filterService.revive();
    }),
  ];
}
