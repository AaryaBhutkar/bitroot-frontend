// import React, { useState, useEffect } from "react";
// import { UserOutlined } from "@ant-design/icons";
// import { Avatar } from "antd";
// import TaskCard from "./pages/TaskCard";
// import ProfileInfo from "../admin/adminPages/ProfileInfo";
// import axios from "axios";
// import MyProjects from "./pages/MyProjects";

// const MainContent = ({ activePage }) => {
//   const [showProfileInfo, setShowProfileInfo] = useState(false);
//   const [currentView, setCurrentView] = useState(activePage);
//   const [tasks, setTasks] = useState([]);

//   const handleProfileClick = () => {
//     setShowProfileInfo(!showProfileInfo);
//   };

//   useEffect(() => {
//     // Close profile info when the activePage changes
//     setShowProfileInfo(false);
//     setCurrentView(activePage); // Update current view when activePage changes
//     if (activePage === "tasks") {
//       fetchTasks();
//     }
//   }, [activePage]);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/tasks/getTasks"
//       );
//       const result = response.data;
//       if (result.success) {
//         console.log("Tasks fetched successfully:", result.data);
//         setTasks(result.data);
//       } else {
//         console.error("Failed to fetch tasks:", result.message);
//       }
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

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
//         <div className=" overflow-y-auto 90vh  ">
//           {currentView === "tasks" &&
//             tasks.map((task) => (
//               <TaskCard
//                 key={task.id}
//                 title={task.name}
//                 description={task.description}
//                 tags={task.tags}
//               />
//             ))}
//           {currentView === "myprojects" && <MyProjects />}
//         </div>
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
import MyProjects from "./pages/MyProjects";
import axios from "axios";

const MainContent = ({ activePage }) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [currentView, setCurrentView] = useState(activePage);
  const [tasks, setTasks] = useState([]);

  const handleProfileClick = () => {
    setShowProfileInfo(!showProfileInfo);
  };

  useEffect(() => {
    setShowProfileInfo(false);
    setCurrentView(activePage);
    if (activePage === "tasks") {
      fetchTasks();
    }
  }, [activePage]);

  const fetchTasks = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/tasks/getTasks"
      );
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
        <>
        {currentView === "tasks" &&
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.name}
              description={task.description}
              tags={task.tags}
            />
          ))}
        {currentView === "my projects" && <MyProjects />} {/* Ensure 'myprojects' matches */}
      </>
      )}
    </div>
  );
};

export default MainContent;
