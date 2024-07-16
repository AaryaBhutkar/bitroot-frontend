// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance';

// const HistoryItem = ({ content }) => (
//   <div className=" mb-4 p-4 border rounded-lg shadow-sm">
//     {content}
//   </div>
// );

// const EvaluatorHistory = () => {
//   const [historyItems, setHistoryItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       const evaluatorId = localStorage.getItem('user');
      
//       if (!evaluatorId) {
//         setError('User ID not found in localStorage');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const response = await axiosInstance.post(
//           'tasks/getHistory',
//           { evaluator_id: Number(evaluatorId) }
//         );

//         if (response.data.success) {
//           setHistoryItems(response.data.data);
//         } else {
//           setError('Failed to fetch history data');
//         }
//       } catch (err) {
//         setError('An error occurred while fetching history data');
//         console.error('Error fetching history:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   if (isLoading) {
//     return <div className="p-6">Loading...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4" >HISTORY</h2>
//       <div>
//         {historyItems.length > 0 ? (
//           historyItems.map((item) => (
//             <HistoryItem key={item.id} content={item.action} />
//           ))
//         ) : (
//           <div className="text-gray-500">No history items found.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EvaluatorHistory;



import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const HistoryItem = ({ content, date }) => {
  const formattedDate = new Date(date).toLocaleString();
  return (
    <div className="mb-4 p-4 border rounded-lg shadow-sm">
      <p className="mb-2">{content}</p>
      <p className="text-sm text-gray-500">{formattedDate}</p>
    </div>
  );
};

const EvaluatorHistory = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const evaluatorId = localStorage.getItem('user');
      
      if (!evaluatorId) {
        setError('User ID not found in localStorage');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.post(
          'tasks/getHistory',
          { evaluator_id: Number(evaluatorId) }
        );

        if (response.data.success) {
          setHistoryItems(response.data.data);
        } else {
          setError('Failed to fetch history data');
        }
      } catch (err) {
        setError('An error occurred while fetching history data');
        console.error('Error fetching history:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">HISTORY</h2>
      <div>
        {historyItems.length > 0 ? (
          historyItems.map((item) => (
            <HistoryItem 
              key={item.id} 
              content={item.action} 
              date={item.action_date}
            />
          ))
        ) : (
          <div className="text-gray-500">No history items found.</div>
        )}
      </div>
    </div>
  );
};

export default EvaluatorHistory;