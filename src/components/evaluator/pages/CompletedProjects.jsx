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

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Completed Projects</h2>
      {completedProjects.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No completed projects yet.</div>
      ) : (
        <div className="space-y-2">
          {completedProjects.map((project) => (
            <div
              key={project.task_id}
              className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{project.task_name}</h3>
                <p className="text-sm text-gray-600">
                  Completed at: {formatDate(project.completed_at)}
                </p>
              </div>
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm transition-colors duration-300"
                onClick={() => handleViewProject(project)}
              >
                View
              </button>
            </div>
          ))}
        </div>
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