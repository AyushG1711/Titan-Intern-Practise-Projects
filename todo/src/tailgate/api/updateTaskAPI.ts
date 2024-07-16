import { Task } from "../../shared/types/task";
import axios from "axios";
const updateTaskAPI = async (payload: Task) => {
  const res = await axios({
    method: "PUT",
    url: "http://localhost:8080/",
    data: payload,
  });
  return res;
};
export { updateTaskAPI };
