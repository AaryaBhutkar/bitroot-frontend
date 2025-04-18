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



import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MenuOutlined } from "@ant-design/icons";

const AdminDashboard = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:hidden bg-white p-4 flex justify-between items-center">
        <button onClick={() => setMobileNavOpen(true)} className="text-2xl">
          <MenuOutlined />
        </button>
        <div className="flex items-center">
          <img src="../evalme.png" alt="EvalMe Logo" className="h-16 w-auto mr-2" />
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

export default AdminDashboard;