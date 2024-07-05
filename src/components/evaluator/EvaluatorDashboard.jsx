// import React, {useEffect, useState} from "react";
// import Sidebar from "./Sidebar";
// import MainContent from "./MainContent";

// const EvaluatorDashboard = () => {
//   const [activePage, setActivePage] = useState("tasks");

//   const handleSidebarClick = (page) => {
//     setActivePage(page);
//   };

//   return (
//     <div className="flex ">
//       <Sidebar onSidebarClick={handleSidebarClick} />
//       <MainContent activePage={activePage} />
//     </div>
//   );
// };

// export default EvaluatorDashboard;




import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const EvaluatorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSidebarClick = (page) => {
    switch(page) {
      case "tasks":
        navigate("/evaluatorDashboard/tasks");
        break;
      case "my projects":
        navigate("/evaluatorDashboard/myprojects");
        break;
      case "completed":
        navigate("/evaluatorDashboard/completed");
        break;
      case "history":
        navigate("/evaluatorDashboard/history");
        break;
      default:
        navigate("/evaluatorDashboard");
    }
  };

  // Determine active page from current path
  const getActivePage = () => {
    const path = location.pathname.split('/').pop();
    switch(path) {
      case "myprojects":
        return "my projects";
      case "completed":
        return "completed";
      case "history":
        return "history";
      default:
        return "tasks";
    }
  };

  return (
    <div className="flex">
      <Sidebar onSidebarClick={handleSidebarClick} activePage={getActivePage()} />
      <Outlet />
    </div>
  );
};

export default EvaluatorDashboard;
