import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import ProfileInfo from "../admin/adminPages/ProfileInfo";

const TaskCard = ({ title, description, tags }) => (
  <div className="bg-white p-4 rounded-lg shadow mb-4">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-gray-200 rounded-full text-sm"
        >
          {tag}
        </span>
      ))}
    </div>
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">Posted Few Hours Ago</span>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        I'm interested
      </button>
    </div>
  </div>
);

const MainContent = () => {
  const tasks = [
    {
      title: "FRONTEND DEVELOPER",
      description:
        "Develop And Maintain Cross-Platform Mobile Applications Using Flutter, Ensuring High Performance And Responsiveness. Collaborate With Design And Backend Teams To Create Seamless User Experiences And Integrate APIs.",
      tags: ["API", "Git", "Flutter", "Agile", "Price"],
    },
    // Add more tasks as needed
  ];
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  const handleProfileClick = () => {
    setShowProfileInfo(!showProfileInfo);
  };

  return (
    <main className="flex-grow p-8 bg-gray-100">
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
      {showProfileInfo && <ProfileInfo />}
      <div className="mb-4 flex justify-end space-x-4">
        <select className="border rounded-md px-3 py-1">
          <option>Price Range</option>
        </select>
        <select className="border rounded-md px-3 py-1">
          <option>Date Posted</option>
        </select>
      </div>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <TaskCard key={index} {...task} />
        ))}
      </div>
    </main>
  );
};

export default MainContent;
