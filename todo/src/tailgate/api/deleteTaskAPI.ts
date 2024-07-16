import axios from "axios";

const deleteTaskAPI = async (id: string) => {
  const res = await axios({
    method: "DELETE",
    url: "http://localhost:8080/",
    data: id,
  });
  return res;
};
export { deleteTaskAPI };
