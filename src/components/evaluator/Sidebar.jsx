import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  ProjectOutlined,
  HistoryOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Sidebar = ({ onSidebarClick }) => {
  const [activeButton, setActiveButton] = useState("TASKS");

  const buttons = [
    { name: "TASKS", icon: <PlusCircleOutlined /> },
    { name: "MY PROJECTS", icon: <ProjectOutlined /> },
    { name: "EXISTING", icon: <HistoryOutlined /> },
  ];

  const handleButtonClick = (name) => {
    setActiveButton(name);
    onSidebarClick(name.toLowerCase());
  };

  return (
    <aside className="w-64 bg-blue-200 p-4 flex flex-col justify-between min-h-screen">
      <div>
        <div className="mb-8 border-b-2 border-black">
          <img src="/logo.png" alt="Bitroot" className="h-10 mb-4" />
        </div>
        <nav>
          <ul className="space-y-2">
            {buttons.map((button) => (
              <li key={button.name}>
                <button
                  onClick={() => handleButtonClick(button.name)}
                  className={`w-full flex items-center space-x-2 p-2 rounded transition-colors ${
                    activeButton === button.name
                      ? "bg-white text-blue-600"
                      : "hover:bg-white/50"
                  }`}
                >
                  <span>{button.icon}</span>
                  <span>{button.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mt-auto">
        <Link
          to="/role"
          className="flex items-center space-x-2 p-2 rounded transition-colors hover:bg-white/50"
        >
          <span className="flex-shrink-0">
            <LogoutOutlined className="h-6 w-6" />
          </span>
          <span className="flex-shrink-0">LOGOUT</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
