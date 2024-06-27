// import React, { useState } from "react";
// import { UserOutlined } from "@ant-design/icons";
// import { Avatar } from "antd";
// import ProfileInfo from "../admin/adminPages/ProfileInfo";
// import TaskCard from "./pages/TaskCard";

// const MainContent = () => {
//   const tasks = [
//     {
//       title: "FRONTEND DEVELOPER",
//       description:
//         "Develop And Maintain Cross-Platform Mobile Applications Using Flutter, Ensuring High Performance And Responsiveness. Collaborate With Design And Backend Teams To Create Seamless User Experiences And Integrate APIs.",
//       tags: ["API", "Git", "Flutter", "Agile", "Price"],
//     },
//     // Add more tasks as needed
//   ];
//   const [showProfileInfo, setShowProfileInfo] = useState(false);

//   const handleProfileClick = () => {
//     setShowProfileInfo(!showProfileInfo);
//   };

//   return (
//     <main className="flex-grow p-8 bg-gray-100">
//       <header className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">HELLO, Evaluator</h1>
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             placeholder="Search"
//             className="border rounded-md px-3 py-1"
//           />
//           <button onClick={handleProfileClick} className="text-gray-600">
//             <Avatar size="large" icon={<UserOutlined />} />
//           </button>
//         </div>
//       </header>
//       {showProfileInfo && <ProfileInfo />}
//       <div className="mb-4 flex justify-end space-x-4">
//         <select className="border rounded-md px-3 py-1">
//           <option>Price Range</option>
//         </select>
//         <select className="border rounded-md px-3 py-1">
//           <option>Date Posted</option>
//         </select>
//       </div>
//       <div className="space-y-4">
//         {tasks.map((task, index) => (
//           <TaskCard key={index} {...task} />
//         ))}
//       </div>
//     </main>
//   );
// };

// export default MainContent;

// import React, { useState, useEffect } from "react";
// import { UserOutlined } from "@ant-design/icons";
// import { Avatar } from "antd";
// import TaskCard from "./pages/TaskCard";
// import ProfileInfo from "../admin/adminPages/ProfileInfo";

// const MainContent = ({ activePage }) => {
//   const [showProfileInfo, setShowProfileInfo] = useState(false);
//   const [currentView, setCurrentView] = useState(activePage);

//   const handleProfileClick = () => {
//     setShowProfileInfo(!showProfileInfo);
//   };

//   useEffect(() => {
//     // Close profile info when the activePage changes
//     setShowProfileInfo(false);
//     setCurrentView(activePage); // Update current view when activePage changes
//   }, [activePage]);

//   return (
//     <div className="flex-1 p-8">
//       <header className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">HELLO, Evaluator</h1>
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             placeholder="Search"
//             className="border rounded-md px-3 py-1"
//           />
//           <button onClick={handleProfileClick} className="text-gray-600">
//             <Avatar size="large" icon={<UserOutlined />} />
//           </button>
//         </div>
//       </header>
//       {showProfileInfo ? (
//         <ProfileInfo />
//       ) : (
//         <>
//           {currentView === "tasks" && <TaskCard />}
//           {/* {currentView === "myProjects" && <MyProjects />}
//           {currentView === "existing" && <ExistingProjects />} */}
//         </>
//       )}
//     </div>
//   );
// };

// export default MainContent;

import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import TaskCard from "./pages/TaskCard";
import ProfileInfo from "../admin/adminPages/ProfileInfo";
import axios from 'axios';

const MainContent = ({ activePage }) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [currentView, setCurrentView] = useState(activePage);
  const [tasks, setTasks] = useState([]);

  const handleProfileClick = () => {
    setShowProfileInfo(!showProfileInfo);
  };

  useEffect(() => {
    // Close profile info when the activePage changes
    setShowProfileInfo(false);
    setCurrentView(activePage); // Update current view when activePage changes
    if (activePage === "tasks") {
      fetchTasks();
    }
  }, [activePage]);

const fetchTasks = async () => {
  try {
    const response = await axios.post("http://localhost:3001/api/tasks/getTasks");
    const result = response.data;
    if (result.success) {
      console.log("Tasks fetched successfully:", result.data);
      setTasks(result.data);
    } else {
      console.error("Failed to fetch tasks:", result.message);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};


  return (
    <div className="flex-1 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">HELLO, Evaluator</h1>
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
        <div className=" overflow-y-auto 90vh  ">
          {currentView === "tasks" &&
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.name}
                description={task.description}
                tags={task.tags}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default MainContent;
