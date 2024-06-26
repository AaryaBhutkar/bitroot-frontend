import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  ProjectOutlined,
  HistoryOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState("TASKS");

  const buttons = [
    { name: "TASKS", icon: <PlusCircleOutlined /> },
    { name: "MY PROJECTS", icon: <ProjectOutlined /> },
    { name: "EXISTING", icon: <HistoryOutlined /> },
  ];

  return (
    <aside className="w-64 bg-blue-200 h-screen p-4 flex flex-col">
      <div className="mb-8">
        <img src="logo.svg" alt="Bitroot" className="h-8" />
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {buttons.map((button) => (
            <li key={button.name}>
              <button
                className={`w-full flex items-center space-x-2 p-2 rounded transition-colors ${
                  activeButton === button.name
                    ? "bg-white text-blue-600"
                    : "hover:bg-white/50"
                }`}
                onClick={() => setActiveButton(button.name)}
              >
                <span>{button.icon}</span>
                <span>{button.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <Link
          to="/login"
          className="flex items-center space-x-2 p-2 rounded transition-colors hover:bg-white/50"
        >
          <span className="flex-shrink-0">LOGOUT</span>
          <span className="flex-shrink-0">
            <LogoutOutlined className="h-6 w-6" />
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
