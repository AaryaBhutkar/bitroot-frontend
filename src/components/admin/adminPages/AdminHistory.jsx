import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const HistoryItem = ({ done_by, action, task_id, action_date }) => (
  <div className="mb-4 p-4 border rounded-lg shadow-sm">
    <p className="text-sm">{action}</p>
    <p className="text-xs text-gray-500 mt-1">
      Done by: <span className="font-semibold">{done_by}</span> on {new Date(action_date).toLocaleString()}
    </p>
  </div>
);

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


// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance';

// const HistoryItem = ({ done_by, action, task_id, action_date }) => (
//   <div className="mb-4 p-4 border rounded-lg shadow-sm">
//     <p className="text-sm">{action}</p>
//     <p className="text-xs text-gray-500 mt-1">
//       Done by: <span className="font-semibold">{done_by}</span> on {new Date(action_date).toLocaleString()}
//     </p>
//   </div>
// );

// const AdminHistory = () => {
//   const [activeTab, setActiveTab] = useState('TASKS');
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   const fetchHistory = async (isTasks, page = 0) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.post('tasks/getHistory', {
//         is_admin: 1,
//         tasks: isTasks ? 1 : 0,
//         page: page
//       });
//       console.log('API Response:', response.data); // Log the full response
//       if (response.data.success) {
//         setHistory(response.data.data.items || []);
//         setTotalPages(response.data.data.totalPages || 0);
//       } else {
//         throw new Error(response.data.message || 'Failed to fetch history');
//       }
//     } catch (error) {
//       console.error('Error details:', error);
//       setError(`Error fetching history: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHistory(true);
//   }, []);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     fetchHistory(tab === 'TASKS');
//   };

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//     fetchHistory(activeTab === 'TASKS', page);
//   };

//   const getPageNumbers = () => {
//     return Array.from({ length: totalPages }, (_, index) => index);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">HISTORY</h1>
//       <div className="mb-4">
//         <button
//           className={`mr-2 px-4 py-2 rounded ${activeTab === 'TASKS' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => handleTabChange('TASKS')}
//         >
//           TASKS
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${activeTab === 'ACTIONS' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => handleTabChange('ACTIONS')}
//         >
//           ACTIONS
//         </button>
//       </div>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {!loading && !error && (
//         <div>
//           {history.length > 0 ? (
//             history.map((item) => (
//               <HistoryItem key={item.id} {...item} />
//             ))
//           ) : (
//             <p>No history items found.</p>
//           )}
//         </div>
//       )}

//       {/* Pagination */}
//       <div className="pagination-container fixed bottom-0 w-full bg-white pb-20 flex ">
//         <nav>
//           <ul className="flex items-center space-x-2">
//             <li>
//               <button
//                 className={`px-3 py-1 border rounded-md ${
//                   currentPage === 0
//                     ? 'cursor-not-allowed opacity-50'
//                     : 'hover:bg-gray-200'
//                 }`}
//                 onClick={() => handlePageClick(currentPage - 1)}
//                 disabled={currentPage === 0}
//               >
//                 &lt;
//               </button>
//             </li>
//             {getPageNumbers().map((page) => (
//               <li key={page}>
//                 <button
//                   className={`px-3 py-1 border rounded-md ${
//                     currentPage === page
//                       ? 'bg-blue-500 text-white'
//                       : 'hover:bg-gray-200'
//                   }`}
//                   onClick={() => handlePageClick(page)}
//                 >
//                   {page + 1}
//                 </button>
//               </li>
//             ))}
//             <li>
//               <button
//                 className={`px-3 py-1 border rounded-md ${
//                   currentPage === totalPages - 1
//                     ? 'cursor-not-allowed opacity-50'
//                     : 'hover:bg-gray-200'
//                 }`}
//                 onClick={() => handlePageClick(currentPage + 1)}
//                 disabled={currentPage === totalPages - 1}
//               >
//                 &gt;
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default AdminHistory;
