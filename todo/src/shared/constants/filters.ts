const filters = {
  priorityOptions: [
    { label: "Low", key: "low" },
    { label: "Medium", key: "medium" },
    { label: "High", key: "high" },
  ],
  statusOptions: [
    { label: "Backlog", key: "backlog" },
    { label: "In Progress", key: "progress" },
    { label: "Completed", key: "completed" },
  ],
  sortingOptions: [
    { label: "Due Date", key: "dueDate" },
    { label: "Title", key: "title" },
  ],
};
export const { priorityOptions, statusOptions, sortingOptions } = filters;
