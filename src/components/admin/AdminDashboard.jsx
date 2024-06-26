// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import MainContent from "./MainContent";

// const AdminDashboard = () => {
//   const [activePage, setActivePage] = useState("createTask");

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar setActivePage={setActivePage} />
//       <MainContent activePage={activePage} />
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("createTask");

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
