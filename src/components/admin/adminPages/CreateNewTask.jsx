import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNewTask = ({ onClose, onSubmit, onTaskCreated }) => {
  const [taskData, setTaskData] = useState({
    taskName: '',
    brief: '',
    tags: [],
    gitLinks: '',
    guidelines: '',
    priceRangeMin: '',
    priceRangeMax: '',
    turnaround_time: '',
  });
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axiosInstance.post('users/getTags', {});
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setAvailableTags(response.data.data);
      } else {
        console.error('Invalid tag data received:', response.data);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleTagChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue && !taskData.tags.includes(selectedValue) && taskData.tags.length < 6) {
      setTaskData(prevData => ({
        ...prevData,
        tags: [...prevData.tags, selectedValue]
      }));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTaskData(prevData => ({
      ...prevData,
      tags: prevData.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const taskDataToSubmit = {
        name: taskData.taskName,
        desc: taskData.brief,
        tags: taskData.tags,
        github_url: taskData.gitLinks,
        guideline_url: taskData.guidelines,
        lower_price: parseInt(taskData.priceRangeMin),
        higher_price: parseInt(taskData.priceRangeMax),
      };

      // Only include turnaround_time if it's not an empty string
      if (taskData.turnaround_time !== '') {
        taskDataToSubmit.turnaround_time = parseInt(taskData.turnaround_time);
      }

      const response = await axiosInstance.post('tasks/createTask', taskDataToSubmit);

      if (response.data.success) {
        toast.success('Task created successfully!');
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-2xl w-full m-4">
        <ToastContainer />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 p-3"
        >
          ✕
        </button>
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto pr-4">
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
              className="m-1 pl-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 pb-3"
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
                className="m-1 pl-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-30 overflow-y-auto resize-none"
                required
              ></textarea>
            </div>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags (Select up to 6):
            </label>
            <select
              id="tags"
              name="tags"
              value=""
              onChange={handleTagChange}
              className="m-1 pl-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
            >
              <option value="" disabled>Select a tag</option>
              {availableTags.map(tag => (
                <option key={tag.id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Selected tags:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {taskData.tags.slice(0, 6).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
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
              className="m-1 pl-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 pb-3"
            />
          </div>

          <div>
            <label htmlFor="guidelines" className="block text-sm font-medium text-gray-700">
              Guidelines:
            </label>
            <input
              type="text"
              id="guidelines"
              name="guidelines"
              value={taskData.guidelines}
              onChange={handleChange}
              className="m-1 pl-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 pb-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price Range (₹):
            </label>
            <div className="flex items-center space-x-2 p-1">
              <input
                type="number"
                name="priceRangeMin"
                value={taskData.priceRangeMin}
                onChange={handleChange}
                min="0"
                className="m-1 pl-1 block w-full p-1 rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Min"
              />
              <span className="text-gray-500">TO</span>
              <input
                type="number"
                name="priceRangeMax"
                value={taskData.priceRangeMax}
                onChange={handleChange}
                min="0"
                className="m-1 pl-1 block w-full p-1 rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Max"
              />
            </div>
          </div>

          <div>
            <label htmlFor="turnaround_time" className="block text-sm font-medium text-gray-700">
              Turnaround Time (hours, optional):
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                id="turnaround_time"
                name="turnaround_time"
                value={taskData.turnaround_time}
                onChange={handleChange}
                min="1"
                className="w-20 m-1 pl-1 text-center rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewTask;