import axios from "axios";
import { Task } from "../../shared/types/task";

const addTaskAPI = async (payload: Task) => {
  const res = await axios({
    method: "POST",
    url: "http://localhost:8080/",
    data: payload,
  });
  return res;
};
export { addTaskAPI };
