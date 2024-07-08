import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const CreateNewTask = ({ onClose, onSubmit, onTaskCreated }) => {
  const [taskData, setTaskData] = useState({
    taskName: '',
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
      const response = await axiosInstance.post(
        'tasks/createTask',
        {
          name: taskData.taskName,
          desc: taskData.brief,
          tags: taskData.tags.split(',').map(tag => tag.trim()),
          github_url: taskData.gitLinks,
          guideline_url: taskData.guidelines,
          lower_price: parseInt(taskData.priceRangeMin),
          higher_price: parseInt(taskData.priceRangeMax),
          turnaround: parseInt(taskData.priceRangeMax),
        }
      );
      
      if (response.data.success) {
        console.log('Task created successfully:', response.data.data);
        onClose();
        onTaskCreated();
      } else {
        console.error('Failed to create task:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-2xl mx-auto">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 p-3"
      >
        ✕
      </button>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">
            Task Name:
          </label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            value={taskData.taskName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 pb-3"
            required
          />
        </div>

        <div>
          <label htmlFor="brief" className="block text-sm font-medium text-gray-700">
            Brief:
          </label>
          <div className="mt-1 relative">
            <textarea
              id="brief"
              name="brief"
              value={taskData.brief}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-30 overflow-y-auto resize-none"
              required
            ></textarea>
          </div>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags:
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={taskData.tags}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 pb-3"
          />
        </div>

        <div>
          <label htmlFor="gitLinks" className="block text-sm font-medium text-gray-700">
            Git Links:
          </label>
          <input
            type="text"
            id="gitLinks"
            name="gitLinks"
            value={taskData.gitLinks}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 pb-3"
          />
        </div>

        <div>
          <label htmlFor="gitLinks" className="block text-sm font-medium text-gray-700">
            Guidelines:
          </label>
          <input
            type="text"
            id="guideline"
            name="guideline"
            value={taskData.guidelines}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 pb-3"
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price Range:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="priceRangeMin"
              value={taskData.priceRangeMin}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Min"
            />
            <span className="text-gray-500">TO</span>
            <input
              type="number"
              name="priceRangeMax"
              value={taskData.priceRangeMax}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Max"
            />
          </div>
        </div>

        <div className="flex justify-center">
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