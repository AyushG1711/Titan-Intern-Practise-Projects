import React from "react";
import { Task } from "../../../shared/types/task";
import "./Task.css";
import { deleteTaskActionCreator } from "../../redux/slices/tasksSlice";
import { useAppDispatch } from "../../redux/hooks";
import { setModal, setTaskToBeUpdated } from "../../redux/slices/modalSlice";
import { nanoid } from "nanoid";
export const priorityColors = {
  low: "#FDE767",
  medium: "#FE7A36",
  high: "#D71313",
};
export const statusColors = {
  completed: "#116A7B",
  backlog: "#D3D3D3",
  progress: "#F6F4EB",
};
const MyTask: React.FC<Task> = (props) => {
  const dispatch = useAppDispatch();
  const handler = {
    updateTask(id: string, taskToBeUpdated: Task) {
      dispatch(setModal(true));
      dispatch(setTaskToBeUpdated(taskToBeUpdated));
    },
    deleteTask(task: Task) {
      dispatch(deleteTaskActionCreator(task));
    },
  };
  return (
    <div className={`task task-${props.id}}`} key={nanoid()}>
      {/* <div className="id">{props.id}</div> */}
      <div className="title">{props.title}</div>
      <div className="description">{props.description}</div>
      <div className="due-date">
        {props.dueDate
          ? `${props.dueDate.date}/${props.dueDate.month}/${props.dueDate.year}`
          : "No Due Date"}
      </div>
      <div className="tags">
        <div
          className="status"
          style={{ backgroundColor: statusColors[props.status] }}
        >
          {props.status}
        </div>
        <div
          className="priority"
          style={{ backgroundColor: priorityColors[props.priority] }}
        >
          {props.priority}
        </div>
      </div>
      <div className="action-btn">
        <button
          onClick={(e) => {
            handler.updateTask(props.id, JSON.parse(JSON.stringify(props)));
          }}
        >
          Update
        </button>
        <button
          onClick={(e) => {
            handler.deleteTask(props);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default MyTask;
