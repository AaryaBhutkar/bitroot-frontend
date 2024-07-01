import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const RequestItem = ({ request, onView, onApprove }) => (
  <div className="bg-blue-50 p-5 rounded-lg shadow mb-4">
    <p className="text-sm text-gray-700 mb-2">
      {request.evaluator_name} has applied for the project {request.task_name}
    </p>
    <div className="flex justify-between items-center">
      <button
        onClick={() => onView(request)}
        className="text-blue-500 font-medium text-sm hover:underline mr-2"
      >
        VIEW
      </button>
      <button
        onClick={() => onApprove(request)}
        className="text-green-500 font-medium text-sm hover:underline"
      >
        APPROVE
      </button>
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
      const response = await axiosInstance.post("tasks/getTasks", {
        is_interested: 1
      });
      if (response.data.success) {
        const transformedRequests = response.data.data.map((item) => ({
          id: item.task_id,
          evaluator_id: item.evaluator_id,
          evaluator_name: item.evaluator_name,
          task_name: item.task_name
        }));
        setRequests(transformedRequests);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleApprove = async (request) => {
    const { id: task_id, evaluator_id } = request;
    try {
      const response = await axiosInstance.post("tasks/assignTask", {
        task_id,
        evaluator_id
      });
      if (response.data.success) {
        fetchRequests();
      }
    } catch (error) {
      console.error("Error approving task:", error);
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
            onApprove={() => handleApprove(request)}
          />
        ))}
      </div>
    </div>
  );
};

export default RequestsList;
