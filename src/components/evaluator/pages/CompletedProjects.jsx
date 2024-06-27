import React, { useState, useEffect } from "react";

const CompletedProjects = () => {
  const [completedProjects, setCompletedProjects] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    // For now, we'll use mock data
    const mockCompletedProjects = [
      {
        id: 1,
        name: "Frontend Developer",
        description: "You have completed Frontend Developer.",
      },
      {
        id: 2,
        name: "Backend Developer",
        description: "You have completed Backend Developer.",
      },
      { id: 3, name: "Flutter", description: "You have completed Flutter" },
    ];

    setCompletedProjects(mockCompletedProjects);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Completed Projects</h2>
      {completedProjects.map((project) => (
        <div
          key={project.id}
          className="bg-white shadow-md rounded-lg p-4 mb-4"
        >
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <p className="text-gray-600 mt-2">{project.description}</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            View
          </button>
        </div>
      ))}
    </div>
  );
};

export default CompletedProjects;
