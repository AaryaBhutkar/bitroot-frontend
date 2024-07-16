// import React from "react";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";

// const EvaluatorDashboard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSidebarClick = (page) => {
//     switch(page) {
//       case "tasks":
//         navigate("/evaluatorDashboard/tasks");
//         break;
//       case "my projects":
//         navigate("/evaluatorDashboard/myprojects");
//         break;
//       case "completed":
//         navigate("/evaluatorDashboard/completed");
//         break;
//       case "history":
//         navigate("/evaluatorDashboard/history");
//         break;
//       default:
//         navigate("/evaluatorDashboard");
//     }
//   };

//   // Determine active page from current path
//   const getActivePage = () => {
//     const path = location.pathname.split('/').pop();
//     switch(path) {
//       case "myprojects":
//         return "my projects";
//       case "completed":
//         return "completed";
//       case "history":
//         return "history";
//       default:
//         return "tasks";
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar onSidebarClick={handleSidebarClick} activePage={getActivePage()} />
//       <Outlet />
//     </div>
//   );
// };

// export default EvaluatorDashboard;
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MenuOutlined } from "@ant-design/icons";

const EvaluatorDashboard = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
      <div className={`md:block ${mobileNavOpen ? 'block' : 'hidden'} md:relative fixed inset-0 z-50`}>
        <Sidebar onClose={() => setMobileNavOpen(false)} />
      </div>
      {mobileNavOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setMobileNavOpen(false)}
        ></div>
      )}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default EvaluatorDashboard;