import React from "react";
import "./AddTaskButton.css";
import { useAppDispatch } from "../../redux/hooks";
import { setModal } from "../../redux/slices/modalSlice";
const AddTaskButton: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const addTaskHandler = (e: any) => {
    dispatch(setModal(true));
  };
  return (
    <div className="add-task-btn-container" onClick={addTaskHandler}>
      <div className="add-task-btn">+</div>
    </div>
  );
};
export default AddTaskButton;
