import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const ShowTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.post('tasks/publicTask');
        console.log(response.data); // Check response structure in console
        setTasks(response.data.data); // Assuming response.data is an array of tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
        // Handle error (e.g., show an error message)
      }
    };

    fetchTasks();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="flex h-screen bg-gray-100 justify-center items-center">
      <div className="w-full max-w-screen-xl bg-white p-4 md:p-6 rounded-lg shadow-lg border border-gray-400">
        <h1 className="text-2xl font-bold mb-4">Available Tasks</h1>
        {tasks.map(task => (
          <div key={task.id} className="mb-6 border-b border-gray-300 pb-4">
            <h2 className="text-lg font-bold">{task.title}</h2>
            <p className="text-gray-600 mb-2">{task.description}</p>
            <div className="flex mb-2">
              <span className="text-gray-800 mr-4">Lower Price: ${task.lower_price}</span>
              <span className="text-gray-800">Higher Price: ${task.higher_price}</span>
            </div>
            <button onClick={()=>window.location.href='/'} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              I'm Interested
            </button>
          </div>
        ))}
        {tasks.length === 0 && <p className="text-gray-600">Loading...</p>}
      </div>
    </div>
  );
};

export default ShowTask;
