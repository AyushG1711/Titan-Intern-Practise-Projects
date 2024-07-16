export type Priority = "low" | "medium" | "high";
export type Status = "backlog" | "completed" | "progress";
export type DueDate = null | { date: number; month: number; year: number };
export type sortBy = string | null;
export type FilterState = {
  priority: Priority[];
  status: Status[];
  dueDate: DueDate;
  sortBy: sortBy;
};
