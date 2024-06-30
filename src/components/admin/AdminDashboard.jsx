import React, { useEffect, useState } from "react";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("tasks");
  useEffect(()=>{

  });

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
