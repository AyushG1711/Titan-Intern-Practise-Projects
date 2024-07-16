import { FilterState } from "../../shared/types/filter";

export const updateLocalStorage = (filters: FilterState) => {
  localStorage.setItem("priority", JSON.stringify(filters.priority));
  localStorage.setItem("status", JSON.stringify(filters.status));
  localStorage.setItem("dueDate", JSON.stringify(filters.dueDate));
  localStorage.setItem("sortBy", JSON.stringify(filters.sortBy));
};
