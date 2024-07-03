import React, { useState } from 'react';

const HistoryItem = ({ user, action, task, viewable = true }) => (
  <div className="mb-4 p-4 border rounded-lg shadow-sm">
    <p className="text-sm">
      <span className="font-semibold">{user}</span> {action} {task}.
    </p>
    {viewable && (
      <button
      className="bg-blue-100 text-blue-800 px-4 py-1 rounded-md"
      onClick={() => handleViewTask(task)}
    >
      View
    </button>
    )}
  </div>
);

const fetchTasks = async () => {
    try {
      const response = await axiosInstance.post("tasks/getHistory", {
        is_admin:1,
    
      });
      if (response.data.success) {
        setTasks(response.data.data);
        const total = response.data.meta.total;
        const calculatedTotalPages = Math.ceil(total / pageSize);
        setTotalPages(calculatedTotalPages);

        // Extract all unique tags from tasks
        const tags = [
          ...new Set(response.data.data.flatMap((task) => task.tags)),
        ];
        setAllTags(tags);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

const AdminHistory = () => {
  const [activeTab, setActiveTab] = useState('TASKS');

  const tasksHistory = [
    { user: 'Admin', action: 'created task for', task: 'Frontend Developer' },
    { user: 'Admin', action: 'has edited the task', task: 'Flutter' },
    { user: 'Admin', action: 'has deleted the task', task: 'Backend Developer' },
  ];

  const actionsHistory = [
    { user: 'Evaluator A', action: 'has been assigned', task: 'Frontend Developer' },
    { user: 'Evaluator A', action: 'has been denied the task for', task: 'Flutter' },
    { user: 'Evaluator A', action: 'has been assigned', task: 'Backend Developer' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">HISTORY</h1>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'TASKS' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('TASKS')}
        >
          TASKS
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'ACTIONS' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('ACTIONS')}
        >
          ACTIONS
        </button>
      </div>
      <div>
        {activeTab === 'TASKS' 
          ? tasksHistory.map((item, index) => (
              <HistoryItem key={index} {...item} />
            ))
          : actionsHistory.map((item, index) => (
              <HistoryItem key={index} {...item} viewable={false} />
            ))
        }
      </div>
    </div>
  );
};

export default AdminHistory;