import React from "react";
import AddTaskButton from "./AddTaskButton";
import TaskList from "./TaskList";
import "./Tasks.css";
const Tasks: React.FC<{}> = () => {
  return (
    <div className="tasks">
      <TaskList />
      <AddTaskButton />
    </div>
  );
};
export default Tasks;
