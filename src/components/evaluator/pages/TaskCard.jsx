// import React from "react";

// const TaskCard = ({ title, description, tags, key }) => {
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

import React, { useState } from "react";
import axios from "axios";
const TaskCard = ({ task_id, title, description, tags,onTaskInterest  }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleInterestClick = async () => {
    console.log("key", task_id);
    console.log("key", title);
    console.log("key", description);
    console.log("key", tags);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/tasks/assignTask",
        {
          task_id: task_id, // Assuming taskId is passed as prop
          evaluator_id: localStorage.getItem("user"), // Replace with actual evaluator ID
          is_interest: 1,
        }
      );
      const result = response.data;
      if (result.success) {
        console.log("Task assigned successfully:", result.data);
        onTaskInterest(task_id);
      } else {
        console.error("Failed to assign task:", result.message);
        // Handle error case if necessary
      }
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

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
        <button
          onClick={handleInterestClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          I'm interested
        </button>
      </div>
      
    </div>
  );
};

export default TaskCard;
