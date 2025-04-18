// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   ProjectOutlined,
//   HistoryOutlined,
//   PlusCircleOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";

// const Sidebar = ({ onSidebarClick, activePage }) => {
//   const [activeTab, setActiveTab] = useState(activePage || "tasks");

//   const buttons = [
//     { name: "tasks", label: "TASKS", icon: <PlusCircleOutlined /> },
//     { name: "my projects", label: "MY TASKS", icon: <ProjectOutlined /> },
//     { name: "completed", label: "COMPLETED", icon: <HistoryOutlined /> },
//     { name: "history", label: "HISTORY", icon: <HistoryOutlined /> }
//   ];

//   const handleSidebarClick = (name) => {
//     setActiveTab(name);
//     onSidebarClick(name);
//   };

//   return (
//     <aside className="w-64 bg-blue-50 p-4 flex flex-col justify-between min-h-screen">
//       <div>
//         <div className="mb-8 ">
//           <img src="/logo.png" alt="Bitroot" className="h-10 mb-4" />
//         </div>
//         <nav>
//           <ul className="space-y-2">
//             {buttons.map((button) => (
//               <li key={button.name}>
//                 <button
//                   onClick={() => handleSidebarClick(button.name)}
//                   className={`w-full flex items-center space-x-2 p-2 rounded transition-colors ${
//                     activeTab === button.name
//                       ? "bg-white text-blue-600"
//                       : "hover:bg-white/50"
//                   }`}
//                 >
//                   <span>{button.icon}</span>
//                   <span>{button.label}</span>
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//       <div className="mt-auto">
//         {/* <Link
//           to="/role"
//           className="flex items-center space-x-2 p-2 rounded transition-colors hover:bg-white/50"
//         >
//           <span className="flex-shrink-0">
//             <LogoutOutlined className="h-6 w-6" />
//           </span>
//           <span className="flex-shrink-0">LOGOUT</span>
//         </Link> */}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ProjectOutlined,
  HistoryOutlined,
  PlusCircleOutlined,
  CloseOutlined
} from "@ant-design/icons";

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    { name: "tasks", label: "TASKS", icon: <PlusCircleOutlined />, path: "/evaluatorDashboard/tasks" },
    { name: "my projects", label: "MY TASKS", icon: <ProjectOutlined />, path: "/evaluatorDashboard/myprojects" },
    { name: "completed", label: "COMPLETED", icon: <HistoryOutlined />, path: "/evaluatorDashboard/completed" },
    { name: "history", label: "HISTORY", icon: <HistoryOutlined />, path: "/evaluatorDashboard/history" }
  ];

  const getActivePage = () => {
    const path = location.pathname.split('/').pop();
    return buttons.find(button => button.path.includes(path))?.name || "tasks";
  };

  const handleSidebarClick = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <aside className="w-64 bg-blue-50 p-4 flex flex-col justify-between min-h-screen">
      <div>
        <div className="flex justify-between items-center p-3 border-b">
          <img src="../evalme.png" alt="EvalMe Logo" className="h-16 w-auto" />
          {onClose && (
            <button onClick={onClose} className="text-2xl md:hidden">
              <CloseOutlined />
            </button>
          )}
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            {buttons.map((button) => (
              <li key={button.name}>
                <button
                  onClick={() => handleSidebarClick(button.path)}
                  className={`w-full flex items-center space-x-2 p-2 rounded transition-colors ${
                    getActivePage() === button.name
                      ? "bg-white text-blue-600"
                      : "hover:bg-white/50"
                  }`}
                >
                  <span>{button.icon}</span>
                  <span>{button.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;