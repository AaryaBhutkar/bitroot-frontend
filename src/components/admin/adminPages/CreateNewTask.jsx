import React, { useState } from 'react';
import axios from 'axios';

const CreateNewTask = ({ onClose, onSubmit, onTaskCreated }) => {
  const [taskData, setTaskData] = useState({
    projectName: '',
    brief: '',
    tags: '',
    gitLinks: '',
    guidelines: '',
    priceRangeMin: '',
    priceRangeMax: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        'http://localhost:3001/api/tasks/createTask',
        {
          name: taskData.projectName,
          desc: taskData.brief,
          tags: taskData.tags.split(',').map(tag => tag.trim()),
          github_url: taskData.gitLinks,
          guideline_url: taskData.guidelines,
          lower_price: parseInt(taskData.priceRangeMin),
          higher_price: parseInt(taskData.priceRangeMax)
        }
      );
      
      if (response.data.success) {
        console.log('Task created successfully:', response.data.data);
        // Optionally handle success, e.g., show a success message
        onClose(); // Close the modal or perform any other action upon success
        onTaskCreated(); // Trigger parent component's refresh after task creation
      } else {
        console.error('Failed to create task:', response.data.message);
        // Optionally handle failure, e.g., show an error message
      }
    } catch (error) {
      console.error('Error creating task:', error);
      // Handle network error or other issues
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-black text-white rounded-md p-2 m-2 mt-2"
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
            Project Name:
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={taskData.projectName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="brief" className="block text-sm font-medium text-gray-700">
            Brief:
          </label>
          <textarea
            id="brief"
            name="brief"
            value={taskData.brief}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags:
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={taskData.tags}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Separate tags with commas"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gitLinks" className="block text-sm font-medium text-gray-700">
            Git Links:
          </label>
          <input
            type="text"
            id="gitLinks"
            name="gitLinks"
            value={taskData.gitLinks}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="guidelines" className="block text-sm font-medium text-gray-700">
            Guidelines:
          </label>
          <textarea
            id="guidelines"
            name="guidelines"
            value={taskData.guidelines}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="3"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price Range:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="priceRangeMin"
              value={taskData.priceRangeMin}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Min"
            />
            <span>TO</span>
            <input
              type="number"
              name="priceRangeMax"
              value={taskData.priceRangeMax}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Max"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewTask;
