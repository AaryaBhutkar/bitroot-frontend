import React, {useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const EvaluatorDashboard = () => {
  const [activePage, setActivePage] = useState("tasks");

  const handleSidebarClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="flex ">
      <Sidebar onSidebarClick={handleSidebarClick} />
      <MainContent activePage={activePage} />
    </div>
  );
};

export default EvaluatorDashboard;
