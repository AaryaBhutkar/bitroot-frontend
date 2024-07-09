// import React, { useState, useEffect, useCallback } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { toast } from "react-toastify";
// import ProjectDetailsModal from "./ProjectDetailsModal";

// const MyProjects = () => {
//   const [activeTab, setActiveTab] = useState("inprogress");
//   const [projects, setProjects] = useState({
//     inprogress: [],
//     assigned: [],
//     interested: [],
//   });
//   const [selectedProject, setSelectedProject] = useState(null);

//   const fetchProjects = useCallback(async () => {
//     try {
//       const tabs = ["inprogress", "assigned", "interested"];
//       const responses = await Promise.all(
//         tabs.map(tab => 
//           axiosInstance.post("tasks/getEvalTasks", {
//             evaluator_id: localStorage.getItem("user"),
//             [tab === "inprogress" ? "in_progress" : `is_${tab}`]: 1,
//           })
//         )
//       );
      
//       const newProjects = Object.fromEntries(
//         tabs.map((tab, index) => [tab, responses[index].data.data])
//       );
      
//       setProjects(newProjects);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//       toast.error("Failed to fetch projects. Please try again.");
//     }
//   }, []);

//   useEffect(() => {
//     fetchProjects();
//   }, [fetchProjects]);

//   const handleActionButton = async (projectId, action) => {
//     try {
//       await axiosInstance.post(
//         `tasks/${action === "start" ? "startTask" : "completeTask"}`,
//         {
//           task_id: projectId,
//           evaluator_id: Number(localStorage.getItem("user")),
//         }
//       );
//       window.dataLayer.push({ event: `${action} Task` });
      
//       await fetchProjects();
//       toast.success(`Task ${action}ed successfully`);
//     } catch (error) {
//       console.error(`Error ${action}ing project:`, error);
//       toast.error(`Failed to ${action} the task. Please try again.`);
//     }
//   };

//   const handleUnassignProject = async (projectId) => {
//     try {
//       await axiosInstance.post("tasks/assignTask", {
//         task_id: projectId,
//         evaluator_id: Number(localStorage.getItem("user")),
//         is_delete: 1,
//       });
//       await fetchProjects();
//       toast.success("Task unassigned successfully");
//       window.dataLayer.push({ event: "Rejected Task" });
//     } catch (error) {
//       console.error("Error unassigning project:", error);
//       // toast.error("Failed to unassign the task. Please try again.");
//     }
//   };

//   const renderProjectItem = (project) => (
//     <div key={project.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-semibold">{project.name}</h3>
//         <div className="flex space-x-2">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() => setSelectedProject(project)}
//           >
//             View
//           </button>
//           {activeTab === "inprogress" ? (
//             <button
//               className="bg-white-500 text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
//               onClick={() => handleActionButton(project.id, "complete")}
//             >
//               Complete
//             </button>
//           ) : (
//             <button
//               className="bg-white-500 text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
//               onClick={() => handleUnassignProject(project.id)}
//             >
//               Delete
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   const renderNoTasksMessage = (tabName) => (
//     <div className="bg-gray-100 border-l-4 text-gray-700 p-4 mb-4">
//       <p className="font-bold">No {tabName} tasks</p>
//       <p>
//         {tabName === "In Progress"
//           ? "You don't have any tasks in progress. Start a task from the Assigned tab."
//           : tabName === "Assigned"
//           ? "You don't have any assigned tasks. Check back later for new assignments."
//           : "You don't have any interested tasks. Mark tasks as interested from the Assigned tab."}
//       </p>
//     </div>
//   );

//   const tabs = [
//     { key: "inprogress", label: "In Progress" },
//     { key: "assigned", label: "Assigned" },
//     { key: "interested", label: "Interested" },
//   ];

//   return (
//     <div className="p-4">
//       <div className="flex mb-4">
//         {tabs.map(tab => (
//           <button
//             key={tab.key}
//             className={`mr-2 px-4 py-2 rounded ${
//               activeTab === tab.key
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//             onClick={() => setActiveTab(tab.key)}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>
//       <div>
//         {projects[activeTab].length > 0
//           ? projects[activeTab].map(renderProjectItem)
//           : renderNoTasksMessage(tabs.find(tab => tab.key === activeTab).label)}
//       </div>
//       {selectedProject && (
//         <ProjectDetailsModal
//           project={selectedProject}
//           onClose={() => setSelectedProject(null)}
//           onStart={() => handleActionButton(selectedProject.id, "start")}
//           showStartButton={activeTab === "assigned"}
//         />
//       )}
//     </div>
//   );
// };

// export default MyProjects;



import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import ProjectDetailsModal from "./ProjectDetailsModal";
import Timer from "./Timer";

const MyProjects = () => {
  const [activeTab, setActiveTab] = useState("inprogress");
  const [projects, setProjects] = useState({
    inprogress: [],
    assigned: [],
    interested: [],
  });
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      const tabs = ["inprogress", "assigned", "interested"];
      const responses = await Promise.all(
        tabs.map(tab => 
          axiosInstance.post("tasks/getEvalTasks", {
            evaluator_id: localStorage.getItem("user"),
            [tab === "inprogress" ? "in_progress" : `is_${tab}`]: 1,
          })
        )
      );
      
      const newProjects = Object.fromEntries(
        tabs.map((tab, index) => [tab, responses[index].data.data])
      );
      
      setProjects(newProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects. Please try again.");
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleActionButton = async (projectId, action) => {
    try {
      await axiosInstance.post(
        `tasks/${action === "start" ? "startTask" : "completeTask"}`,
        {
          task_id: projectId,
          evaluator_id: Number(localStorage.getItem("user")),
        }
      );
      
      await fetchProjects();
      toast.success(`Task ${action}ed successfully`);
      window.dataLayer.push({ event: `${action} Task` });
    } catch (error) {
      console.error(`Error ${action}ing project:`, error);
      toast.error(`Failed to ${action} the task. Please try again.`);
    }
  };

  const handleUnassignProject = async (projectId) => {
    try {
      await axiosInstance.post("tasks/assignTask", {
        task_id: projectId,
        evaluator_id: Number(localStorage.getItem("user")),
        is_delete: 1,
      });
      await fetchProjects();
      toast.success("Task unassigned successfully");
      window.dataLayer.push({ event: "Rejected Task" });
    } catch (error) {
      console.error("Error unassigning project:", error);
    }
  };

  const renderProjectItem = (project) => (
    <div key={project.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setSelectedProject(project)}
          >
            View
          </button>
          {activeTab === "inprogress" ? (
            <button
              className="bg-white-500 text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
              onClick={() => handleActionButton(project.id, "complete")}
            >
              Complete
            </button>
          ) : (
            <button
              className="bg-white-500 text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
              onClick={() => handleUnassignProject(project.id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      {["inprogress", "assigned"].includes(activeTab) && (
        <Timer startTime={project.updated_at} />
      )}
    </div>
  );

  const renderNoTasksMessage = (tabName) => (
    <div className="bg-gray-100 border-l-4 text-gray-700 p-4 mb-4">
      <p className="font-bold">No {tabName} tasks</p>
      <p>
        {tabName === "In Progress"
          ? "You don't have any tasks in progress. Start a task from the Assigned tab."
          : tabName === "Assigned"
          ? "You don't have any assigned tasks. Check back later for new assignments."
          : "You don't have any interested tasks. Mark tasks as interested from the Assigned tab."}
      </p>
    </div>
  );

  const tabs = [
    { key: "inprogress", label: "In Progress" },
    { key: "assigned", label: "Assigned" },
    { key: "interested", label: "Interested" },
  ];

  return (
    <div className="p-4">
      <div className="flex mb-4">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`mr-2 px-4 py-2 rounded ${
              activeTab === tab.key
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {projects[activeTab].length > 0
          ? projects[activeTab].map(renderProjectItem)
          : renderNoTasksMessage(tabs.find(tab => tab.key === activeTab).label)}
      </div>
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onStart={() => handleActionButton(selectedProject.id, "start")}
          showStartButton={activeTab === "assigned"}
        />
      )}
    </div>
  );
};

export default MyProjects;