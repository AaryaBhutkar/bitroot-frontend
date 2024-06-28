import React from "react";

const TaskDetailsPopup = ({ task, onClose, onDelete }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md w-1/2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">{task.name}</h2>
          <button
            onClick={onClose}
            className="bg-black text-white px-2 py-1 rounded"
          >
            X
          </button>
        </div>
        <p className="mb-4">Date: {new Date(task.created_at).toLocaleDateString()}</p>
        <p className="mb-4">{task.description}</p>
        <div className="mb-4">
          <h3 className="font-bold">Tags:</h3>
          <div className="flex space-x-2">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 rounded-full px-2 py-1 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Price Range:</h3>
          <p>${task.lower_price} - ${task.higher_price}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Status:</h3>
          <p>{task.is_assigned ? "Assigned" : task.is_completed ? "Complete" : "Open"}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">GitHub URL:</h3>
          <a href={task.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {task.github_url}
          </a>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Guideline URL:</h3>
          <a href={task.guideline_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {task.guideline_url}
          </a>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPopup;