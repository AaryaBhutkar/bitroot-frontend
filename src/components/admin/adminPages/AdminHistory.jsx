import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

// const HistoryItem = ({ done_by, action, task_id, action_date }) => (
//   <div className="mb-4 p-4 border rounded-lg shadow-sm">
//     <p className="text-sm">{action}</p>
//     <p className="text-xs text-gray-500 mt-1">
//       Done by: <span className="font-semibold">{done_by}</span> on {new Date(action_date).toLocaleString()}
//     </p>
//   </div>
// );

const HistoryItem = ({ done_by, action, task_id, action_date }) => {
  const formattedDate = new Date(action_date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formattedTime = new Date(action_date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return (
    <div className="mb-4 p-4 border rounded-lg shadow-sm">
      <p className="text-sm">{action}</p>
      <p className="text-xs text-gray-500 mt-1">
        Done by: <span className="font-semibold">{done_by}</span> on {formattedDateTime}
      </p>
    </div>
  );
};


const AdminHistory = () => {
  const [activeTab, setActiveTab] = useState('TASKS');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = async (isTasks) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('tasks/getHistory', {
        is_admin: 1,
        tasks: isTasks ? 1 : 0
      });
      console.log('API Response:', response.data); // Log the full response
      if (response.data.success) {
        setHistory(response.data.data || []);
      } else {
        throw new Error(response.data.message || 'Failed to fetch history');
      }
    } catch (error) {
      console.error('Error details:', error);
      setError(`Error fetching history: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(true);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    fetchHistory(tab === 'TASKS');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">HISTORY</h1>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'TASKS' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('TASKS')}
        >
          TASKS
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'ACTIONS' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('ACTIONS')}
        >
          ACTIONS
        </button>
      </div>
      <div className="history-list" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div>
            {history.length > 0 ? (
              history.map((item) => (
                <HistoryItem key={item.id} {...item} />
              ))
            ) : (
              <p>No history items found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHistory;
