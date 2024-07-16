import { useEffect, useState } from "react";
import "./App.css";
import Filters from "./vanguard/components/Filters/Filters";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MyTasks from "./vanguard/components/Tasks/Tasks";
import { useAppDispatch, useAppSelector } from "./vanguard/redux/hooks";
import AddTaskModal from "./vanguard/components/Tasks/AddTaskModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bridge } from "./shared/bridge";
import {
  addTask,
  deleteTask,
  updateTask,
  updateTaskList,
} from "./vanguard/redux/slices/tasksSlice";
import { Task } from "./shared/types/task";
import { Tasks } from "./shared/types/tasks";
import {
  reviveFiltersFromLS,
  setFilters,
} from "./vanguard/redux/slices/filterSlice";
import { FilterState } from "./shared/types/filter";
import { EVENT } from "./shared/constants/events";
import Temp from "./Temp";
function App() {
  const [temp, setTemp] = useState(0);
  const dispatch = useAppDispatch();
  const { show } = useAppSelector((store) => store.modal);
  const refHandler = (ref: any) => {
    console.log(ref);
  };
  useEffect(() => {
    console.log("Fdf");
    setTemp((temp) => temp + 1);
    const unsubscribeRevertAddTask = bridge.subscribe(
      EVENT.REVERT_ADD_TASK,
      (id: string) => {
        dispatch(deleteTask(id));
      }
    );

    const unsubscribeRevertUpdateTask = bridge.subscribe(
      EVENT.REVERT_UPDATE_TASK,
      (task: Task) => {
        dispatch(updateTask(task));
      }
    );

    const unsubscribeRevertDeleteTask = bridge.subscribe(
      EVENT.REVERT_DELETE_TASK,
      (task: Task) => {
        dispatch(addTask(task));
      }
    );
    const unsubscribeUdpateTaskList = bridge.subscribe(
      EVENT.UPDATE_TASK_LIST,
      (filteredTasks: Tasks) => {
        dispatch(updateTaskList(filteredTasks));
      }
    );
    bridge.subscribe(EVENT.UPDATE_FILTERS, (filters: FilterState) => {
      dispatch(setFilters(filters));
    });
    bridge.subscribe(EVENT.FAILURE, (message: string) => {
      toast(message);
    });
    dispatch(reviveFiltersFromLS());
    return () => {
      unsubscribeRevertAddTask();
      unsubscribeRevertUpdateTask();
      unsubscribeRevertDeleteTask();
      unsubscribeUdpateTaskList();
    };
  }, []);
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <button ref={refHandler}>Click me</button>
        <Temp name={"fdf"} />
        {show ? (
          <AddTaskModal />
        ) : (
          <>
            <Filters />
            <MyTasks />
          </>
        )}
      </LocalizationProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
