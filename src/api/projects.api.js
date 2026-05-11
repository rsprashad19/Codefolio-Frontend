import axiosInstance from "./axios";

export const getProjects = () => axiosInstance.get("/projects");

const statusToApiValue = {
  Open: "Open",
  "Work in progress": "WorkInProgress",
  Closed: "Closed",
};

const normalizeTechStack = (techStack) => {
  if (Array.isArray(techStack)) {
    return techStack;
  }

  return String(techStack || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

export const createProject = (data) =>
  axiosInstance.post("/projects/add", {
    ...data,
    techStack: normalizeTechStack(data.techStack),
    status: statusToApiValue[data.status] || "Open",
  });

export const deleteProject = (id) => axiosInstance.delete(`/projects/${id}`);
export const updateProject = (id, data) =>
  axiosInstance.patch(`/projects/${id}`, data);
