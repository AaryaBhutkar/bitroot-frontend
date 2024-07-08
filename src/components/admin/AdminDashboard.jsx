// import React, { useEffect, useState } from "react";
// import MainContent from "./MainContent";
// import Sidebar from "./Sidebar";

// const Dashboard = () => {
//   const [activePage, setActivePage] = useState("tasks");
//   useEffect(()=>{

//   });

//   const handleSidebarClick = (page) => {
//     setActivePage(page);
//   };

//   return (
//     <div className="flex">
//       <Sidebar onSidebarClick={handleSidebarClick} />
//       <MainContent activePage={activePage} />
//     </div>
//   );
// };

// export default Dashboard;




import React, { useEffect, useState } from "react";
import MainContent from "./AdminMainContent";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [activePage, setActivePage] = useState("tasks");
  // useEffect(()=>{

  // });

  const handleSidebarClick = (page) => {
    switch(page) {
      case "tasks":
        navigate("/adminDashboard/tasks");
        break;
      case "requests":
        navigate("/adminDashboard/requests");
        break;
      case "analytics":
        navigate("/adminDashboard/analytics");
        break;
      case "history":
        navigate("/adminDashboard/history");
        break;
      default:
        navigate("/adminDashboard");
    }
  };

    const getActivePage = () => {
    const path = location.pathname.split('/').pop();
    switch(path) {
      case "requests":
        return "requests";
      case "analytics":
        return "analytics";
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

export default AdminDashboard;