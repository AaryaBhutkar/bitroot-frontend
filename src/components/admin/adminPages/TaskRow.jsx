// TaskRow.jsx
import React from "react";
import Tag from "./Tag";

const TaskRow = ({ task, onViewTask }) => (
  <tr className="border-t border-gray-200 text-lg">
    <td className="py-4 px-2">{task.name}</td>
    <td className="py-4 px-2">
      {new Date(task.created_at).toLocaleDateString()}
    </td>
    <td className="py-4 px-2">
      <div className="flex flex-wrap gap-1 max-w-xs">
        {task.tags.map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </div>
    </td>
    <td className="py-4 px-2">
      {task.lower_price} - {task.higher_price}
    </td>
    <td className="py-4 px-2">
      <span
        className={`px-2 py-1 rounded-md text-sm ${
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
    </td>
    <td className="py-4 px-2">
      <button
        className="bg-blue-100 text-blue-800 px-4 py-1 rounded-md text-sm"
        onClick={() => onViewTask(task)}
      >
        View
      </button>
    </td>
  </tr>
);

export default TaskRow;
