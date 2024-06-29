import React, { useState, useEffect } from "react";
import axios from "axios";

const MyProjects = ({ setCompletedProjects }) => {
  const [activeTab, setActiveTab] = useState("IN PROGRESS");
  const [projects, setProjects] = useState({
    inprogress: [],
    assigned: []
  });
  const [selectedProject, setSelectedProject] = useState(null); // State to track the selected project for detailed view

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const [inProgressResponse, assignedResponse] = await Promise.all([
        axios.post('http://localhost:3001/api/tasks/getEvalTasks', { evaluator_id: localStorage.getItem("user"), in_progress: 1 }),
        axios.post('http://localhost:3001/api/tasks/getEvalTasks', { evaluator_id: localStorage.getItem("user"), is_assigned: 1 })
      ]);
      setProjects({
        inprogress: inProgressResponse.data.data,
        assigned: assignedResponse.data.data
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleActionButton = async (projectId, action) => {
    try {
      await axios.post(
        `http://localhost:3001/api/tasks/${action === "start" ? "startTask" : "completeTask"}`,
        { task_id: projectId }
      );
      if (action === "start") {
        const project = projects.assigned.find(p => p.id === projectId);
        setProjects(prevState => ({
          inprogress: [...prevState.inprogress, project],
          assigned: prevState.assigned.filter(p => p.id !== projectId)
        }));
      } else if (action === "complete") {
        const project = projects.inprogress.find(p => p.id === projectId);
        setCompletedProjects(prevState => [...prevState, project]);
        setProjects(prevState => ({
          inprogress: prevState.inprogress.filter(p => p.id !== projectId),
          assigned: prevState.assigned
        }));
      }
    } catch (error) {
      console.error(`Error ${action} project:`, error);
    }
  };

  const handleViewProject = (project) => {
    setSelectedProject(project); // Set the selected project for detailed view
  };

  const handleClosePopup = () => {
    setSelectedProject(null); // Close the detailed view popup
  };

  const renderProjectItem = (project) => (
    <div
      key={project.id}
      className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center relative"
    >
      <div>
        <p className="font-semibold">
          Evaluator {project.evaluator_name} you have applied for {project.name}.
        </p>
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2"
          onClick={() => handleViewProject(project)} // Handle click to view project details
        >
          View
        </button>
        {activeTab === "IN PROGRESS" ? (
          <button
            className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            onClick={() => handleActionButton(project.id, "complete")}
          >
            Complete
          </button>
        ) : (
          <button
            className="mt-2 bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
            onClick={() => handleActionButton(project.id, "start")}
          >
            Start
          </button>
        )}
      </div>
      {selectedProject && selectedProject.id === project.id && (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
            <h3 className="text-lg font-semibold mb-2">
              Project Details for {selectedProject.name}
            </h3>
            <p>Evaluator: {selectedProject.evaluator_name}</p>
            <p>Description: {selectedProject.description}</p>
            {selectedProject.tags && (
              <p>Tags: {selectedProject.tags.join(', ')}</p>
            )}
            {selectedProject.github_url && (
              <p>Github URL: <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer">{selectedProject.github_url}</a></p>
            )}
            {selectedProject.guideline_url && (
              <p>Guideline URL: <a href={selectedProject.guideline_url} target="_blank" rel="noopener noreferrer">{selectedProject.guideline_url}</a></p>
            )}
            <p>Lower Price: ${selectedProject.lower_price}</p>
            <p>Higher Price: ${selectedProject.higher_price}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === "IN PROGRESS"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("IN PROGRESS")}
        >
          IN PROGRESS
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "ASSIGNED"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("ASSIGNED")}
        >
          ASSIGNED
        </button>
      </div>
      <div className="space-y-4">
        {projects[activeTab.toLowerCase().replace(" ", "")].map(renderProjectItem)}
      </div>
    </div>
  );
};

export default MyProjects;
