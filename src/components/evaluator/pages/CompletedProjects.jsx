import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import ProjectDetailsModal from "./ProjectDetailsModal";

const CompletedProjects = () => {
  const [completedProjects, setCompletedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchCompletedProjects = async () => {
      try {
        const response = await axiosInstance.post("tasks/completeTask", {
          evaluator_id: localStorage.getItem("user"),
          is_fetch: 1
        });

        if (response.data.success) {
          console.log("task data:  ", response.data.data)
          setCompletedProjects(response.data.data);
        } else {
          setError("Failed to fetch completed projects");
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch completed projects");
        setLoading(false);
      }
    };

    fetchCompletedProjects();
  }, []);

  const handleViewProject = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Completed Projects</h2>
      {completedProjects.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No completed projects yet.</div>
      ) : (
        completedProjects.map((project) => (
          <div
            key={project.task_id}
            className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold">{project.task_name}</h3>
            <p className="text-gray-600 mt-2">
              Completed At: {new Date(project.completed_at).toLocaleString()}
            </p>
            <p className="text-gray-600 mt-2">Evaluator: {project.evaluator_name}</p>
            <button 
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              onClick={() => handleViewProject(project)}
            >
              View Details
            </button>
          </div>
        ))
      )}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CompletedProjects;