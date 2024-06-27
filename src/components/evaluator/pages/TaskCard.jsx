// import React from "react";

// const TaskCard = ({ title, description, tags }) => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow mb-4">
//       <h3 className="text-lg font-semibold mb-2">{title}</h3>
//       <p className="text-gray-600 mb-4">{description}</p>
//       <div className="flex flex-wrap gap-2 mb-4">
//         {tags.map((tag, index) => (
//           <span
//             key={index}
//             className="px-2 py-1 bg-gray-200 rounded-full text-sm"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>
//       <div className="flex justify-between items-center">
//         <span className="text-sm text-gray-500">Posted Few Hours Ago</span>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//           I'm interested
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;

// import React from "react";

// const TaskCard = () => {
//   const tasks = [
//     {
//       id: 1,
//       projectName: "Frontend Developer",
//       description:
//         "Develop And Maintain Cross-Platform Mobile Applications Using Flutter, Ensuring High Performance And Responsiveness. Collaborate With Design And Backend Teams To Create Seamless User Experiences And Integrate APIs.",
//       tags: ["API", "Git", "Flutter", "Agile", "Price"],
//       postedTime: "Few Hours Ago",
//     },
//   ];

//   return (
//     <div>
//       {tasks.map((task) => (
//         <div key={task.id} className="bg-white p-4 rounded-lg shadow mb-4">
//           <h2 className="text-xl font-bold mb-2">{task.projectName}</h2>
//           <p className="text-gray-700 mb-4">{task.description}</p>
//           <div className="flex flex-wrap gap-2 mb-4">
//             {task.tags.map((tag, index) => (
//               <span
//                 key={index}
//                 className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//           <p className="text-gray-500 mb-4">Posted {task.postedTime}</p>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
//             I'm interested
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TaskCard;



import React from "react";

const TaskCard = ({ title, description, tags }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-200 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Posted Few Hours Ago</span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          I'm interested
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
