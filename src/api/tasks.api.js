import axiosInstance from "./axios";

const statusToApiValue = {
  WorkingInProgress: "Working in progress",
};

const statusFromApiValue = {
  "Working in progress": "WorkingInProgress",
};

const mapTaskToApi = (data) => ({
  ...data,
  status: statusToApiValue[data.status] || data.status,
  projectId: data.projectId || null,
});

const mapTaskFromApi = (task) => ({
  ...task,
  status: statusFromApiValue[task.status] || task.status,
});

export const getTasks = async () => {
  const res = await axiosInstance.get("/tasks");

  return {
    ...res,
    data: res.data.map(mapTaskFromApi),
  };
};

export const createTask = (data) =>
  axiosInstance.post("/tasks/add", mapTaskToApi(data));

export const updateTask = (id, data) =>
  axiosInstance.patch(`/tasks/${id}`, mapTaskToApi(data));

export const deleteTask = (id) => axiosInstance.delete(`/tasks/${id}`);
