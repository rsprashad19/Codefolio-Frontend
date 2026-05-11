import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ProjectList from "@/components/projects/ProjectList";
import ProjectForm from "@/components/projects/ProjectForm";
import { getProjects } from "@/api/projects.api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // ✅ NEW

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data || []);
    } catch (error) {
      console.error("Failed to fetch projects", error);
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project) => {
    setSelectedProject(project);
    setOpenForm(true);
  };

  const handleCreate = () => {
    setSelectedProject(null); // reset
    setOpenForm(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>

        <Button onClick={handleCreate}>+ New Project</Button>
      </div>

      <ProjectList
        projects={projects}
        refresh={fetchProjects}
        onEdit={handleEdit} // ✅ pass down
      />

      <ProjectForm
        open={openForm}
        setOpen={setOpenForm}
        refresh={fetchProjects}
        project={selectedProject} // ✅ pass selected project
      />
    </div>
  );
}
