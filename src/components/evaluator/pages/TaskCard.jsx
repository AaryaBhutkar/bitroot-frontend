// import React, { useState } from "react";
// import axios from "axios";
// import axiosInstance from "../../utils/axiosInstance";
// import { toast } from "react-toastify";
// const TaskCard = ({ task_id, title, description, tags,onTaskInterest  }) => {

//   const handleInterestClick = async () => {
//     console.log("key", task_id);
//     console.log("key", title);
//     console.log("key", description);
//     console.log("key", tags);
//     try {
//       const response = await axiosInstance.post(
//         "tasks/assignTask",
//         {
//           task_id: task_id, // Assuming taskId is passed as prop
//           evaluator_id: localStorage.getItem("user"), // Replace with actual evaluator ID
//           is_interest: 1,
//         }
//       );
//       const result = response.data;
//       if (result.success) {
//         toast.success("Interest Notified !");
//         console.log("Task assigned successfully:", result.data);
//         onTaskInterest(task_id);
//       } else {
//         console.error("Failed to assign task:", result.message);
//         // Handle error case if necessary
//       }
//     } catch (error) {
//       console.error("Error assigning task:", error);
//     }
//   };

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
//         <button
//           onClick={handleInterestClick}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           I'm interested
//         </button>
//       </div>
      
//     </div>
//   );
// };

// export default TaskCard;


import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import { ClipboardList, Clock } from "lucide-react";

const TaskCard = ({ task_id, title, description, tags, onTaskInterest }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleInterestClick = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("tasks/assignTask", {
        task_id: task_id,
        evaluator_id: localStorage.getItem("user"),
        is_interest: 1,
      });
      const result = response.data;
      if (result.success) {
        toast.success("Interest Notified!");
        onTaskInterest(task_id);
      } else {
        toast.error("Failed to assign task: " + result.message);
      }
    } catch (error) {
      toast.error("Error assigning task: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!task_id) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <ClipboardList className="w-16 h-16 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-700">No Tasks Available</h3>
          <p className="text-gray-600">There are currently no tasks or recent projects to display.</p>
          <p className="text-gray-500">Check back later for new opportunities!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          Posted Few Hours Ago
        </span>
        <button
          onClick={handleInterestClick}
          disabled={isLoading}
          className={`px-4 py-2 rounded font-medium ${
            isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } transition-colors duration-300`}
        >
          {isLoading ? "Processing..." : "I'm interested"}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;