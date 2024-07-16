import { db } from "./db";

const deleteTaskFromIDB = async (id: string) => {
  console.log(id);
  const returnedId = await db.transaction("rw", db.tasks, async (tx) => {
    return await db.tasks.where("id").equals(id).delete();
  });
  return returnedId;
};
export { deleteTaskFromIDB };
