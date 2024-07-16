// db.ts
import Dexie, { Table } from "dexie";

export interface Friend {
  marks: number;
  age: number;
  phone: number;
  idkd: number;
}

export class MySubClassedDexie extends Dexie {
  friends!: Table<Friend>;

  constructor() {
    super("myDatabase");
    this.version(400).stores({
      //first prop will automatically become a primary key
      //++prop means autoincrement
      //&prop means prop won't allow duplicates
      friends: "idkd, marks", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
