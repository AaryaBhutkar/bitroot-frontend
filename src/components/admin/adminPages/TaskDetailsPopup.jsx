import React, { useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from 'react-toastify';

const TaskDetailsPopup = ({ task, onClose, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ ...task });
  const [isUpdating, setIsUpdating] = useState(false);

  if (!task) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!onUpdate) return;
    setIsUpdating(true);
    try {
      const response = await axiosInstance.post('tasks/createTask', {
        id: task.id,
        name: updatedTask.name,
        desc: updatedTask.description,
        lower_price: updatedTask.lower_price,
        higher_price: updatedTask.higher_price,
        github_url: updatedTask.github_url,
        guideline_url: updatedTask.guideline_url,
        evaluator_name: task.evaluator_name, // keep original evaluator name
        tags: updatedTask.tags,
        is_update: 1,
      });

      if (response.data.success) {
        onUpdate(updatedTask);
        onClose();
      } else {
        console.error('Failed to update task:', response.data);
        toast.error("Failed to update task. Please try again.");
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error("An error occurred while updating the task. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    try {
      await onDelete();
      toast.success("Task deleted successfully");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md w-1/2 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{editMode ? "Edit Task" : task.name}</h2>
          <button onClick={onClose} className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 px-3 py-1 rounded-full shadow-md transition-colors duration-200 ease-in-out">
  &times;
</button>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Task Name:</label>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={updatedTask.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          ) : (
            <p>{task.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Evaluator Name:</label>
          <p>{task.evaluator_name}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Description:</label>
          {editMode ? (
            <textarea
              name="description"
              value={updatedTask.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          ) : (
            <p>{task.description}</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="font-bold mb-2">Price Range (₹):</h3>
          {editMode ? (
            <div className="flex gap-2">
              <input
                type="number"
                name="lower_price"
                value={updatedTask.lower_price}
                onChange={handleInputChange}
                className="w-1/2 p-2 border border-gray-300 rounded"
                placeholder="Lower Price"
              />
              <input
                type="number"
                name="higher_price"
                value={updatedTask.higher_price}
                onChange={handleInputChange}
                className="w-1/2 p-2 border border-gray-300 rounded"
                placeholder="Higher Price"
              />
            </div>
          ) : (
            <p>₹{task.lower_price} - ₹{task.higher_price}</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="font-bold mb-2">GitHub URL:</h3>
          {editMode ? (
            <input
              type="text"
              name="github_url"
              value={updatedTask.github_url}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          ) : (
            <a href={task.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {task.github_url}
            </a>
          )}
        </div>

        <div className="mb-4">
          <h3 className="font-bold mb-2">Guideline URL:</h3>
          {editMode ? (
            <input
              type="text"
              name="guideline_url"
              value={updatedTask.guideline_url}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          ) : (
            <a href={task.guideline_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {task.guideline_url}
            </a>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          {onUpdate && (
            editMode ? (
              <button 
                onClick={handleUpdate} 
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
            ) : (
              <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Edit
              </button>
            )
          )}
          {onDelete && (
            <button onClick={handleDelete} className="px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

TaskDetailsPopup.propTypes = {
  task: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default TaskDetailsPopup;
