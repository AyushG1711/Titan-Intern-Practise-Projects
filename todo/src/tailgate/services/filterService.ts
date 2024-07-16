import { FilterState } from "../../shared/types/filter";
import { bridge } from "../../shared/bridge";
import { db } from "../repo/db";
import { EVENT } from "../../shared/constants/events";
const helper = (key: string, fallback: any) => {
  let field: any = localStorage.getItem(key);
  if (field) field = JSON.parse(field);
  else field = fallback;
  return field;
};
class FilterService {
  async apply(filters: FilterState) {
    let { priority, status, dueDate, sortBy } = filters;
    if (!priority.length) priority = ["high", "low", "medium"];
    if (!status.length) status = ["backlog", "completed", "progress"];
    const keyPath = !sortBy
      ? "title"
      : sortBy === "dueDate"
      ? "[dueDate.year+dueDate.month+dueDate.date]"
      : sortBy;
    try {
      const filteredTasks = await db.transaction("r", db.tasks, async (trx) => {
        const documents = await db.tasks
          .orderBy(keyPath)
          .and((task) => {
            return priority.includes(task.priority);
          })
          .and((task) => {
            return status.includes(task.status);
          })
          .and((task) => {
            if (dueDate) {
              if (task.dueDate) {
                return (
                  dueDate.date === task.dueDate.date &&
                  dueDate.month === task.dueDate.month &&
                  dueDate.year === task.dueDate.year
                );
              }
              return false;
            }
            return true;
          })
          .toArray();
        return documents;
      });
      bridge.emit(EVENT.UPDATE_TASK_LIST, filteredTasks);
    } catch (err) {
      bridge.emit(EVENT.FAILURE, "Tasks could not be filtered/loaded");
    }
  }
  revive() {
    let priority: any = helper("priority", []);
    let status: any = helper("status", []);
    let dueDate: any = helper("dueDate", null);
    let sortBy: any = helper("sortBy", null);
    const filters: FilterState = { priority, status, dueDate, sortBy };
    bridge.emit(EVENT.UPDATE_FILTERS, filters);
    this.apply(filters);
  }
}
export const filterService = new FilterService();
