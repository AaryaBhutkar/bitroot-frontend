import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const ShowTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.post('tasks/publicTask');
        setTasks(response.data.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div className="w-1/4 bg-gray-200 shadow-lg">
        <div className="p-4">
          <img src="logo.svg" alt="Bitroot" className="w-48" />
        </div>
      </div>
      <div className="w-3/4 p-8">
        <h1 className="text-2xl font-bold mb-6">Checkout available projects</h1>
        {tasks.length === 0 && <p className="text-gray-600">Loading...</p>}
        {tasks.map(task => (
          <div key={task.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-bold mb-2 uppercase">{task.title}</h2>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {task.tags.map(tag => (
                <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Posted few hours ago</span>
              <button onClick={()=>{window.dataLayer.push({'event':'Not login interest'});window.location.href='/'}} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                I'm Interested
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowTask;