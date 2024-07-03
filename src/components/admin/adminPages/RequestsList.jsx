import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from 'react-toastify';

const RequestItem = ({ request, onView, onApprove, onDeny }) => (
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
      <div>
        <button
          onClick={() => onDeny(request)}
          className="text-white-500 bg-red-500 rounded-xl p-2 font-medium text-sm hover:underline mr-2"
        >
          DENY
        </button>
        <button
          onClick={() => onApprove(request)}
          className="text-white-500 bg-green-500 rounded-xl p-2 font-medium text-sm hover:underline"
        >
          APPROVE
        </button>
      </div>
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
        is_interested: 1,
      });
      if (response.data.success) {
        const transformedRequests = response.data.data.map((item) => ({
          id: item.task_id,
          evaluator_id: item.evaluator_id,
          evaluator_name: item.evaluator_name,
          task_name: item.task_name,
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
        evaluator_id,
      });
      if (response.data.success) {
        fetchRequests();
        toast.success("Task approved successfully");
      }
    } catch (error) {
      console.error("Error approving task:", error);
      toast.error("Error approving task");
    }
  };

  // const handleDeny = async (request) => {
  //   const { id: task_id, evaluator_id } = request;
  //   try {
  //     const response = await axiosInstance.post("tasks/assignTask", {
  //       task_id,
  //       evaluator_id,
  //       is_deny: 1
  //     });
  //     if (response.data.success) {
  //       toast.success("Task denied successfully");
  //       await fetchRequests();
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.error("Error denying task:", error);
  //     toast.error("Error denying task");
  //   }
  // };

  const handleDeny = async (request) => {
    const { id: task_id, evaluator_id } = request;
    try {
      const response = await axiosInstance.post("tasks/assignTask", {
        task_id,
        evaluator_id,
        is_deny: 1
      });
      if (response.data.success) {
        toast.success("Task denied successfully");
        await fetchRequests();
        window.location.reload();
      } else {
        throw new Error(response.data.message || 'Failed to deny task');
      }
    } catch (error) {
      console.error("Error denying task:", error);
      toast.error(`Error denying task: ${error.message}`);
    }
  };

  // const handleDeny = async (request) => {
  //   const { id: task_id, evaluator_id } = request;
  //   try {
  //     const response = await axiosInstance.post("tasks/rejectTask", {
  //       task_id,
  //       evaluator_id,
  //     });
  //     if (response.data.success) {
  //       fetchRequests();
  //     }
  //   } catch (error) {
  //     console.error("Error rejecting task:", error);
  //   }
  // }

  return (
    <div className="p-6 max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Requests</h2>
      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        {requests.map((request) => (
          <RequestItem
            key={request.id}
            request={request}
            onView={onViewRequest}
            onReject={() => handleDeny(request)}
            onApprove={() => handleApprove(request)}
            onDeny={() => handleDeny(request)}
          />
        ))}
      </div>
    </div>
  );
};

export default RequestsList;
