import { Task } from "../../shared/types/task";
import { db } from "./db";

const updateTaskToIDB = async (payload: Task) => {
  const updatedTask = await db.transaction("rw", db.tasks, async (tx) => {
    await db.tasks.put({ ...payload });
  });
  return updatedTask;
};
export { updateTaskToIDB };
