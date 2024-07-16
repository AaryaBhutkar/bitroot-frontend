import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Popover, Avatar } from "antd";
import TasksContent from "./adminPages/TaskContent";
import RequestsList from "./adminPages/RequestsList";
import EvaluatorDetails from "./EvaluatorDetails";
import AdminHistory from "./adminPages/AdminHistory";
import AnalyticsDashboard from "./adminPages/AnalyticsDashboard";

const AdminMainContent = ({ activePage }) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [currentView, setCurrentView] = useState(activePage);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [tasksKey, setTasksKey] = useState(0); // New state to trigger re-render
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProfileClick = () => {
    setShowProfileInfo(!showProfileInfo);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      // Navigate to role
      window.location.href = "/role";
    }
    if(localStorage.getItem("user") && parseInt(localStorage.getItem("user"))>0){
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
    window.location.href = "/login";
  };

  const content = (
    <div>
      <Link
        to="/login"
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
    <div className="flex flex-col h-screen w-full">
      <header className="flex justify-between items-center p-4 bg-white shadow-md w-full">
        <h1 className="text-2xl font-bold">HELLO, ADMIN</h1>
        <div className="flex items-center space-x-4">
          <Popover content={content} trigger="click">
            <button className="text-gray-600">
              <Avatar size="large" icon={<UserOutlined />} />
            </button>
          </Popover>
        </div>
      </header>
      <div className="">
        {currentView === "tasks" && (
          <TasksContent key={tasksKey} onTaskCreated={handleTaskCreated} />
        )}
        {currentView === "requests" && (
          <RequestsList onViewRequest={handleViewRequest} />
        )}
        {currentView === "analytics" && <AnalyticsDashboard />}
        {currentView === "evaluatorDetails" && selectedRequest && (
          <EvaluatorDetails
            evaluatorId={selectedRequest.evaluator_id}
            onBack={handleBack}
          />
        )}
        {currentView === "history" && <AdminHistory />}
      </div>
    </div>
  );
};

export default AdminMainContent;
