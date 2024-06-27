import React, { useState } from "react";

// Demo data
const demoData = {
  inprogress: [
    { id: 1, title: "Frontend Developer" },
    { id: 2, title: "React Native Developer" },
    { id: 3, title: "UI/UX Designer" },
  ],
  assigned: [
    { id: 4, title: "Backend Developer" },
    { id: 5, title: "DevOps Engineer" },
    { id: 6, title: "Data Scientist" },
  ],
};

const MyProjects = () => {
  const [activeTab, setActiveTab] = useState("IN PROGRESS");


  const getProjects = () => {
    return activeTab === "IN PROGRESS"
      ? demoData.inprogress
      : demoData.assigned;
  };

  const renderProjectItem = (project) => (
    <div key={project.id} className="bg-white p-4 rounded-lg shadow mb-4">
      <p className="font-semibold">
        Evaluator A you have applied for {project.title}.
      </p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
        View
      </button>
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
      <div className="space-y-4">{getProjects().map(renderProjectItem)}</div>
    </div>
  );
};

export default MyProjects;
