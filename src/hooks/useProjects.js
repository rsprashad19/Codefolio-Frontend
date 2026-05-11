import { useEffect, useState } from "react";
import * as api from "@/api/projects.api";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await api.getProjects();
      setProjects(res.data || []);
    } catch (error) {
      console.error("Failed to fetch projects", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (data) => {
    await api.createProject(data);
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, createProject, refreshProjects: fetchProjects };
}
