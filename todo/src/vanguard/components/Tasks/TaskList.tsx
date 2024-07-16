import React from "react";
import { useAppSelector } from "../../redux/hooks";
import MyTask from "./Task";
import "./TaskList.css";
import { DueDate, Priority, Status } from "../../../shared/types/filter";
import { Task } from "../../../shared/types/task";
//filtering inside the component
export const shouldInclude = (
  task: Task,
  priority: Priority[],
  status: Status[],
  dueDate: DueDate
) => {
  if (
    priority.length === 0 ||
    (priority.length > 0 && priority.includes(task.priority))
  ) {
    if (
      status.length === 0 ||
      (status.length > 0 && status.includes(task.status))
    ) {
      if (
        dueDate === null ||
        (task.dueDate &&
          task.dueDate.date === dueDate.date &&
          task.dueDate.month === dueDate.month &&
          task.dueDate.year === dueDate.year)
      ) {
        return true;
      }
    }
  }
  return false;
};

const TaskList: React.FC<{}> = () => {
  const { tasks } = useAppSelector((store) => store.tasks);
  return (
    <div className="task-list">
      {tasks.map((task, index) => {
        return <MyTask key={index} {...task} />;
      })}
    </div>
  );
};
export default TaskList;
