import React, { useState } from "react";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("tasks");

  const handleSidebarClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="flex">
      <Sidebar onSidebarClick={handleSidebarClick} />
      <MainContent activePage={activePage} />
    </div>
  );
};

export default Dashboard;
