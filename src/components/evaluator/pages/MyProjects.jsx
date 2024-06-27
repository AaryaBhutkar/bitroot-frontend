// import React, { useState } from "react";

// // Demo data
// const demoData = {
//   inprogress: [
//     { id: 1, title: "Frontend Developer" },
//     { id: 2, title: "React Native Developer" },
//     { id: 3, title: "UI/UX Designer" },
//   ],
//   assigned: [
//     { id: 4, title: "Backend Developer" },
//     { id: 5, title: "DevOps Engineer" },
//     { id: 6, title: "Data Scientist" },
//   ],
// };

// const MyProjects = () => {
//   const [activeTab, setActiveTab] = useState("IN PROGRESS");

//   const getProjects = () => {
//     return activeTab === "IN PROGRESS"
//       ? demoData.inprogress
//       : demoData.assigned;
//   };

//   const renderProjectItem = (project) => (
//     <div key={project.id} className="bg-white p-4 rounded-lg shadow mb-4">
//       <p className="font-semibold">
//         Evaluator A you have applied for {project.title}.
//       </p>
//       <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
//         View
//       </button>
//     </div>
//   );

//   return (
//     <div className="p-4">
//       <div className="flex mb-4">
//         <button
//           className={`mr-2 px-4 py-2 rounded ${
//             activeTab === "IN PROGRESS"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//           onClick={() => setActiveTab("IN PROGRESS")}
//         >
//           IN PROGRESS
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${
//             activeTab === "ASSIGNED"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//           onClick={() => setActiveTab("ASSIGNED")}
//         >
//           ASSIGNED
//         </button>
//       </div>
//       <div className="space-y-4">{getProjects().map(renderProjectItem)}</div>
//     </div>
//   );
// };

// export default MyProjects;

import React, { useState, useEffect } from "react";
import axios from "axios";

// Demo data (kept for fallback)
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
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, [activeTab]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/projects/${activeTab
          .toLowerCase()
          .replace(" ", "")}`
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Fallback to demo data if API call fails
      setProjects(
        activeTab === "IN PROGRESS" ? demoData.inprogress : demoData.assigned
      );
    }
  };

  const handleActionButton = async (projectId, action) => {
    try {
      await axios.post(
        `http://localhost:3001/api/projects/${projectId}/${action}`
      );
      // Refresh projects after action
      fetchProjects();
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
          Evaluator A you have applied for {project.title}.
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
      <div className="space-y-4">{projects.map(renderProjectItem)}</div>
    </div>
  );
};

export default MyProjects;
