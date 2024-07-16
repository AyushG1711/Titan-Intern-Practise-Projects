import Dexie, { Table } from "dexie";
import type { Task } from "../../shared/types/task";

export class MySubClassedDexie extends Dexie {
  tasks!: Table<Task>;

  constructor() {
    super("todo-app");
    this.version(1).stores({
      tasks: "id, title, priority, [dueDate.year+dueDate.month+dueDate.date]",
    });
  }
}

export const db = new MySubClassedDexie();
