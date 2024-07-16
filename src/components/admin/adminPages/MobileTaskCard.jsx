import React from 'react';
import { Clock } from 'lucide-react';

const MobileTaskCard = ({ task, onViewTask }) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-2">{task.name}</h3>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <Clock className="w-4 h-4 mr-1" />
        {new Date(task.created_at).toLocaleDateString()}
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {task.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="text-sm mb-2">
        <strong>Price Range:</strong> ₹{task.lower_price} - ₹{task.higher_price}
      </div>
      <div className="text-sm mb-2">
        <strong>Description:</strong> {task.description}
      </div>
      {task.assigned_to && (
        <div className="text-sm mb-2">
          <strong>Assigned To:</strong> {task.evaluator_name}
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-2 py-1 rounded-md text-xs ${
            task.is_completed
              ? "bg-gray-200 text-green-800"
              : task.is_assigned
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-300 text-black"
          }`}
        >
          {task.is_completed
            ? "Completed"
            : task.is_assigned
            ? "Assigned"
            : "Open"}
        </span>
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm"
          onClick={() => onViewTask(task)}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default MobileTaskCard;