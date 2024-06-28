import React, { useState, useEffect } from "react";
import axios from "axios";

const MyProjects = ({ setCompletedProjects }) => {
  const [activeTab, setActiveTab] = useState("IN PROGRESS");
  const [projects, setProjects] = useState({
    inprogress: [],
    assigned: []
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const [inProgressResponse, assignedResponse] = await Promise.all([
        axios.post('http://localhost:3001/api/tasks/getEvalTasks', { evaluator_id: 33, in_progress: 1 }),
        axios.post('http://localhost:3001/api/tasks/getEvalTasks', { evaluator_id: 40, is_assigned: 1 })
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

  const renderProjectItem = (project) => (
    <div
      key={project.id}
      className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center"
    >
      <div>
        <p className="font-semibold">
          Evaluator {project.evaluator_name} you have applied for {project.name}.
        </p>
        <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2">
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
      <div className="space-y-4">{projects[activeTab.toLowerCase().replace(" ", "")].map(renderProjectItem)}</div>
    </div>
  );
};

export default MyProjects;
