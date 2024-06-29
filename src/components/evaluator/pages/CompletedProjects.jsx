// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CompletedProjects = () => {
//   const [completedProjects, setCompletedProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCompletedProjects = async () => {
//       try {
//         const response = await axios.post("http://localhost:3001/api/tasks/completeTask", {
//           task_id: 9,
//           evaluator_id: 5
//         });

//         // Assuming the API returns an array of completed projects
//         // If it doesn't, you may need to adjust this part based on the actual response structure
//         setCompletedProjects(prevProjects => [...prevProjects, response.data]);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch completed projects");
//         setLoading(false);
//       }
//     };

//     fetchCompletedProjects();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold mb-4">Completed Projects</h2>
//       {completedProjects.map((project) => (
//         <div
//           key={project.task_id}
//           className="bg-white shadow-md rounded-lg p-4 mb-4"
//         >
//           <h3 className="text-lg font-semibold">Task ID: {project.task_id}</h3>
//           {/* <p className="text-gray-600 mt-2">Evaluator ID: {project.evaluator_id}</p> */}
//           <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
//             View
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CompletedProjects;








import React, { useState, useEffect } from "react";
import axios from "axios";

const CompletedProjects = () => {
  const [completedProjects, setCompletedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedProjects = async () => {
      try {
        const response = await axios.post("http://localhost:3001/api/tasks/completeTask", {
          // evaluator_id: user.evaluator_id,
          evaluator_id: 40,
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
