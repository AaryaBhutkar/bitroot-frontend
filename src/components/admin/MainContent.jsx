import React, { useState, useEffect } from "react";
import CreateTaskForm from "./adminPages/CreateTaskForm";
import ProfileInfo from "./adminPages/ProfileInfo";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const MainContent = ({ activePage }) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  const handleProfileClick = () => {
    setShowProfileInfo(!showProfileInfo);
  };

  useEffect(() => {
    // Close profile info when the activePage changes
    setShowProfileInfo(false);
  }, [activePage]);

  return (
    <div className="flex-1 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">HELLO, ADMIN</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-md px-3 py-1"
          />
          <button onClick={handleProfileClick} className="text-gray-600">
            <Avatar size="large" icon={<UserOutlined />} />
          </button>
        </div>
      </header>
      {showProfileInfo ? (
        <ProfileInfo />
      ) : (
        <>
          {activePage === "tasks" && <CreateTaskForm />}
          {activePage === "requests" && <div>Requests Page Content</div>}
          {activePage === "analytics" && <div>Analytics Page Content</div>}
        </>
      )}
    </div>
  );
};

export default MainContent;
