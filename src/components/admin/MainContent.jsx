import React, { useState, useEffect } from "react";
import ProfileInfo from "./adminPages/ProfileInfo";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import TasksContent from "./adminPages/TaskContent";
import RequestsList from "./adminPages/RequestsList";
import EvaluatorDetails from "./EvaluatorDetails";

const MainContent = ({ activePage }) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [currentView, setCurrentView] = useState(activePage);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [tasksKey, setTasksKey] = useState(0); // New state to trigger re-render

  const handleProfileClick = () => {
    setShowProfileInfo(!showProfileInfo);
  };
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      //navigate to role
      window.location.href = "/role";
    }
  },[])

  useEffect(() => {
    setShowProfileInfo(false);
    setCurrentView(activePage);
    setSelectedRequest(null);
  }, [activePage]);

  const handleViewRequest = (request) => {
    console.log("req",request);
    setSelectedRequest(request);
    setCurrentView("evaluatorDetails");
  };

  const handleBack = () => {
    setCurrentView("requests");
    setSelectedRequest(null);
  };

  // New function to trigger tasks reload
  const handleTaskCreated = () => {
    setTasksKey(prevKey => prevKey + 1);
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
      <>
          {currentView === "tasks" && (
            <TasksContent key={tasksKey} onTaskCreated={handleTaskCreated} />
          )}
          {currentView === "requests" && (
            <RequestsList onViewRequest={handleViewRequest} />
          )}
          {currentView === "analytics" && <div>Analytics Page Content</div>}
          {currentView === "evaluatorDetails" && selectedRequest && (
            <EvaluatorDetails evaluatorId={selectedRequest.evaluator_id} onBack={handleBack} />
          )}
        </>
      {/* {showProfileInfo ? (
        <ProfileInfo />
      ) : (
        <>
          {currentView === "tasks" && (
            <TasksContent key={tasksKey} onTaskCreated={handleTaskCreated} />
          )}
          {currentView === "requests" && (
            <RequestsList onViewRequest={handleViewRequest} />
          )}
          {currentView === "analytics" && <div>Analytics Page Content</div>}
          {currentView === "evaluatorDetails" && selectedRequest && (
            <EvaluatorDetails evaluator={selectedRequest} onBack={handleBack} />
          )}
        </>
      )} */}
    </div>
  );
};

export default MainContent;