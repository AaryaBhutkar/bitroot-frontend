import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Dashboard;