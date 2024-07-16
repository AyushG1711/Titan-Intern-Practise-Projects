import { DueDate, Priority, Status } from "./filter";

export type Task = {
  status: Status;
  priority: Priority;
  title: string;
  description: string;
  dueDate: DueDate;
  id: string;
};
