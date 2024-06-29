import React, { useState, useEffect } from "react";
import axios from "axios";

const RequestItem = ({ request, onView }) => (
  <div className="bg-blue-50 p-5 rounded-lg shadow mb-4">
    <p className="text-sm text-gray-700 mb-2">
      {request.evaluator_name} has applied for the project {request.task_name}
    </p>
    <div className="flex justify-between items-center">
      <button
        onClick={() => onView(request)}
        className="text-blue-500 font-medium text-sm hover:underline"
      >
        VIEW
      </button>
      <button className="text-gray-400 hover:text-gray-600">...</button>
    </div>
  </div>
);

const RequestsList = ({ onViewRequest }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/tasks/getTasks", {
        is_interested: 1
      });
      if (response.data.success) {
        const transformedRequests = response.data.data.map((item) => ({
          id: item.task_id,
          evaluator_name: item.evaluator_name,
          task_name: item.task_name
        }));
        setRequests(transformedRequests);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  return (
    <div className="p-6 max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Requests</h2>
      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        {requests.map((request) => (
          <RequestItem
            key={request.id}
            request={request}
            onView={onViewRequest}
          />
        ))}
      </div>
    </div>
  );
};

export default RequestsList;
