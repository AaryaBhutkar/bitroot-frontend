import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const CompletedProjects = () => {
  const [completedProjects, setCompletedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedProjects = async () => {
      try {
        const response = await axiosInstance.post("tasks/completeTask", {
          evaluator_id: localStorage.getItem("user") ,
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Completed Projects</h2>
      {completedProjects.map((project) => (
        <div
          key={project.task_id}
          className="bg-white shadow-md rounded-lg p-4 mb-4"
        >
          <h3 className="text-lg font-semibold">Task: {project.task_name}</h3>
          <p className="text-gray-600 mt-2">Completed At: {new Date(project.completed_at).toLocaleString()}</p>
          <p className="text-gray-600 mt-2">Evaluator: {project.evaluator_name}</p>
          {/* <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            View
          </button> */}
        </div>
      ))}
    </div>
  );
};

export default CompletedProjects;
