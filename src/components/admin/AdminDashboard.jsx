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
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";


const MobileNav = ({ isOpen, onClose, onSidebarClick, activePage }) => (
  <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
    <div
      className="absolute inset-0 bg-black opacity-50"
      onClick={onClose}
    ></div>
    <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <img
          src="../logo.png"
          alt="Bitroot Logo"
          className="h-8 w-auto"
        />
        <button onClick={onClose} className="text-2xl">
          <CloseOutlined />
        </button>
      </div>
      <Sidebar
        onSidebarClick={(page) => {
          onSidebarClick(page);
          onClose();
        }}
        activePage={activePage}
      />
    </div>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:hidden bg-white p-4 flex justify-between items-center">
        <button onClick={() => setMobileNavOpen(true)} className="text-2xl">
          <MenuOutlined />
        </button>
        <div className="flex items-center">
          <img src="../logo.png" alt="Bitroot Logo" className="h-8 w-auto mr-2" />
        </div>
      </div>
      <div className="hidden md:block">
        <div className="p-4 border-b">
          <img src="../logo.png" alt="Bitroot Logo" className="h-10 w-auto" />
        </div>
        <Sidebar onSidebarClick={handleSidebarClick} activePage={getActivePage()} />
      </div>
      <MobileNav 
        isOpen={mobileNavOpen} 
        onClose={() => setMobileNavOpen(false)} 
        onSidebarClick={handleSidebarClick}
        activePage={getActivePage()}
      />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;