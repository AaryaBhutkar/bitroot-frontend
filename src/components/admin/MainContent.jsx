import React, { useState, useEffect } from "react";
import CreateTaskForm from "./adminPages/CreateTaskForm";
import ProfileInfo from "./adminPages/ProfileInfo";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import TasksContent from "./adminPages/TaskContent";
import RequestsList from "./adminPages/RequestsList";
import EvaluatorDetails from "./EvaluatorDetails"; // Import EvaluatorDetails component

const MainContent = ({ activePage }) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [currentView, setCurrentView] = useState(activePage); // Manage current view state
  const [selectedRequest, setSelectedRequest] = useState(null); // Manage selected request state

  const handleProfileClick = () => {
    setShowProfileInfo(!showProfileInfo);
  };

  useEffect(() => {
    // Close profile info when the activePage changes
    setShowProfileInfo(false);
    setCurrentView(activePage); // Update current view when activePage changes
    setSelectedRequest(null); // Reset selected request when activePage changes
  }, [activePage]);

  const handleViewRequest = (request) => {
    setSelectedRequest(request); // Set selected request
    setCurrentView("evaluatorDetails"); // Change view to EvaluatorDetails
  };

  const handleBack = () => {
    setCurrentView("requests"); // Change view back to RequestsList
    setSelectedRequest(null); // Clear selected request
  };

  return (
    <div className="flex-1 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">HELLO, ADMIN</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-md px-3 py-1"
          />
          <button onClick={handleProfileClick} className="text-gray-600">
            <Avatar size="large" icon={<UserOutlined />} />
          </button>
        </div>
      </header>
      {showProfileInfo ? (
        <ProfileInfo />
      ) : (
        <>
          {currentView === "tasks" && <TasksContent />}
          {currentView === "requests" && (
            <RequestsList onViewRequest={handleViewRequest} />
          )}
          {currentView === "analytics" && <div>Analytics Page Content</div>}
          {currentView === "evaluatorDetails" && selectedRequest && (
            <EvaluatorDetails evaluator={selectedRequest} onBack={handleBack} />
          )}
        </>
      )}
    </div>
  );
};

export default MainContent;
