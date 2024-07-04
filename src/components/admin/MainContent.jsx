import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Popover, Avatar } from "antd";
import TasksContent from "./adminPages/TaskContent";
import RequestsList from "./adminPages/RequestsList";
import EvaluatorDetails from "./EvaluatorDetails";
import AdminHistory from "./adminPages/AdminHistory";

const MainContent = ({ activePage }) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [currentView, setCurrentView] = useState(activePage);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [tasksKey, setTasksKey] = useState(0); // New state to trigger re-render

  const handleProfileClick = () => {
    setShowProfileInfo(!showProfileInfo);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      // Navigate to role
      window.location.href = "/role";
    }
  }, []);

  useEffect(() => {
    setShowProfileInfo(false);
    setCurrentView(activePage);
    setSelectedRequest(null);
  }, [activePage]);

  const handleViewRequest = (request) => {
    console.log("req", request);
    setSelectedRequest(request);
    setCurrentView("evaluatorDetails");
  };

  const handleBack = () => {
    setCurrentView("requests");
    setSelectedRequest(null);
  };

  // New function to trigger tasks reload
  const handleTaskCreated = () => {
    setTasksKey((prevKey) => prevKey + 1);
  };

  const handleLogout = () => {
    // Clear local storage and navigate to login or role page
    localStorage.removeItem("token");
    window.location.href = "/role";
  };

  const content = (
    <div>
      <Link
        to="/role"
        onClick={handleLogout}
        className="flex items-center bg-blue-500 space-x-2 p-2 rounded transition-colors "
      >
        <span className="flex-shrink-0">
          <LogoutOutlined className="h-6 w-6 text-white" />
        </span>
        <span className="flex-shrink-0 text-white">LOGOUT</span>
      </Link>
    </div>
  );

  return (
    <div className="flex-1 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">HELLO, ADMIN</h1>
        <div className="flex items-center space-x-4">
          <Popover content={content} trigger="click">
            <button className="text-gray-600">
              <Avatar size="large" icon={<UserOutlined />} />
            </button>
          </Popover>
        </div>
      </header>
      <>
        {currentView === "tasks" && (
          <TasksContent key={tasksKey} onTaskCreated={handleTaskCreated} />
        )}
        {currentView === "requests" && (
          <RequestsList onViewRequest={handleViewRequest} />
        )}
        {currentView === "analytics" && <div>Analytics Page Content</div>}
        {currentView === "evaluatorDetails" && selectedRequest && (
          <EvaluatorDetails
            evaluatorId={selectedRequest.evaluator_id}
            onBack={handleBack}
          />
        )}
        {currentView === "history" && <AdminHistory />}
      </>
    </div>
  );
};

export default MainContent;
