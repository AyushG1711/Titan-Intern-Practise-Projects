import React, { useState } from "react";
import "./AddTaskModal.css";
import { Task } from "../../../shared/types/task";
import { Status, Priority } from "../../../shared/types/filter";
import CheckboxLabels from "../Filters/CheckBoxLabels";
import {
  priorityOptions,
  statusOptions,
} from "../../../shared/constants/filters";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addTaskActionCreator,
  updateTaskActionCreator,
} from "../../redux/slices/tasksSlice";
import { nanoid } from "nanoid";
import MyDatePicker from "../Filters/DatePicker";
import { setModal, setTaskToBeUpdated } from "../../redux/slices/modalSlice";
import { toast } from "react-toastify";
import { priorityColors, statusColors } from "./Task";
type NewTask = {
  priority: Task["priority"] | null;
  status: Task["status"] | null;
  dueDate: Task["dueDate"];
  title: Task["title"];
  description: Task["description"];
};
const AddTaskModal: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { taskToBeUpdated } = useAppSelector((store) => store.modal);
  const [task, setTask] = useState<NewTask>({
    status: !taskToBeUpdated ? null : taskToBeUpdated.status,
    priority: !taskToBeUpdated ? null : taskToBeUpdated.priority,
    dueDate: !taskToBeUpdated ? null : taskToBeUpdated.dueDate,
    title: !taskToBeUpdated ? "" : taskToBeUpdated.title,
    description: !taskToBeUpdated ? "" : taskToBeUpdated.description,
  });
  const handler = {
    setPriority(key: NewTask["priority"]) {
      setTask({ ...task, priority: key });
    },
    setStatus(key: NewTask["status"]) {
      setTask({ ...task, status: key });
    },
    setDate(date: number, month: number, year: number) {
      setTask({ ...task, dueDate: { date, month, year } });
    },
    setTitle(e: React.ChangeEvent<HTMLInputElement>) {
      const key: NewTask["title"] = e.target.value;
      setTask({ ...task, title: key });
    },
    setDescription(e: any) {
      const key: NewTask["description"] = e.target.value;
      setTask({ ...task, description: key });
    },
    clearDate() {
      setTask({ ...task, dueDate: null });
    },
    submit() {
      if (
        !task.dueDate ||
        !task.priority ||
        !task.status ||
        task.title.length === 0
      ) {
        toast("Please fill in all the details");
        return;
      }
      const id = nanoid();
      let status: Status = "backlog";
      if (task.status) status = task.status;
      let priority: Priority = "high";
      if (task.priority) priority = task.priority;
      if (taskToBeUpdated) {
        dispatch(
          updateTaskActionCreator({
            old: taskToBeUpdated,
            new: { ...task, id: taskToBeUpdated.id, status, priority },
          })
        );

        dispatch(setTaskToBeUpdated(null));
      } else {
        dispatch(addTaskActionCreator({ ...task, id, status, priority }));
      }
      dispatch(setModal(false));
    },
    cancel() {
      dispatch(setModal(false));
      dispatch(setTaskToBeUpdated(null));
    },
  };
  return (
    <div className="add-task-modal">
      <div className="container">
        <div className="title">Title</div>
        <input
          type="text"
          value={task.title}
          onChange={handler.setTitle}
        ></input>
      </div>
      <div className="container">
        <div className="title">Description</div>
        <textarea
          value={task.description}
          onChange={handler.setDescription}
        ></textarea>
      </div>
      <div className="container">
        <div className="title">Select Priority</div>
        <CheckboxLabels
          options={priorityOptions}
          onSelect={handler.setPriority}
          state={task.priority ? [task.priority] : []}
          colors={priorityColors}
        />
      </div>
      <div className="container">
        <div className="title">Select Status</div>
        <CheckboxLabels
          options={statusOptions}
          onSelect={handler.setStatus}
          state={task.status ? [task.status] : []}
          colors={statusColors}
        />
      </div>
      <div className="container">
        <div className="title">Due Date</div>
        <MyDatePicker
          setDateHandler={handler.setDate}
          clearDateHandler={handler.clearDate}
          value={task.dueDate}
        />
      </div>
      <div className="action-btn container">
        <button onClick={handler.cancel}>Cancel</button>
        <button onClick={handler.submit}>
          {taskToBeUpdated ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};
export default AddTaskModal;
