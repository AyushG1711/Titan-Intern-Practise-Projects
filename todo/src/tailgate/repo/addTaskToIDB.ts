import { Task } from "../../shared/types/task";
import { db } from "./db";

const addTaskToIDB = async (payload: Task) => {
  const res = await db.transaction("rw", db.tasks, async (trx) => {
    const task = await db.tasks.add(payload);
    return task;
  });
  return res;
};
export { addTaskToIDB };
