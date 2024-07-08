import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from 'react-toastify';

const DenyModal = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    onConfirm(reason.trim());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Deny Request</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &#x2715; {/* X symbol */}
          </button>
        </div>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value.slice(0, 100))}
          placeholder="Enter reason for denial (optional)"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 h-32 resize-none"
          maxLength={100}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Confirm Deny
          </button>
        </div>
        <div className="mt-4 text-sm text-red-600">
          {100 - reason.length} characters remaining
        </div>
      </div>
    </div>
  );
};

const RequestItem = ({ request, onView, onApprove, onDeny }) => (
  <div className="bg-blue-50 p-5 rounded-lg shadow mb-4">
    <p className="text-sm text-gray-700 mb-2">
      {request.evaluator_name} has applied for the task {request.task_name}
    </p>
    <div className="flex justify-between items-center">
      <button
        onClick={() => onView(request)}
        className="border border-blue-500 p-1 rounded-md text-blue-500 font-medium text-sm hover:underline mr-2"
      >
        VIEW
      </button>
      <div className="flex space-x-2">
        <button
          onClick={() => onApprove(request)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Approve
        </button>
        <button
          onClick={() => onDeny(request)}
          className="px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50"
        >
          Reject
        </button>
      </div>
    </div>
  </div>
);

const RequestsList = ({ onViewRequest }) => {
  const [requests, setRequests] = useState([]);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

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

  const handleDeny = async (request) => {
    setSelectedRequest(request);
    setIsDenyModalOpen(true);
  };

  const confirmDeny = async (reason) => {
    const { id: task_id, evaluator_id } = selectedRequest;
    try {
      const response = await axiosInstance.post("tasks/assignTask", {
        task_id,
        evaluator_id,
        is_deny: 1,
        deny_reason: reason
      });
      if (response.data.success) {
        toast.success("Task denied successfully");
        await fetchRequests();
      } else {
        throw new Error(response.data.message || 'Failed to deny task');
      }
    } catch (error) {
      console.error("Error denying task:", error);
      toast.error(`Error denying task: ${error.message}`);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Requests</h2>
      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        {requests.map((request) => (
          <RequestItem
            key={request.id}
            request={request}
            onView={onViewRequest}
            onApprove={() => handleApprove(request)}
            onDeny={() => handleDeny(request)}
          />
        ))}
      </div>
      <DenyModal
        isOpen={isDenyModalOpen}
        onClose={() => setIsDenyModalOpen(false)}
        onConfirm={confirmDeny}
      />
    </div>
  );
};

export default RequestsList;