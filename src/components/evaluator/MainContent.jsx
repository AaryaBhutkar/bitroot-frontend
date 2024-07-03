// import React, { useState, useEffect } from "react";
// import { UserOutlined } from "@ant-design/icons";
// import { Avatar } from "antd";
// import TaskCard from "./pages/TaskCard";
// import ProfileInfo from "../admin/adminPages/ProfileInfo";
// import MyProjects from "./pages/MyProjects";
// import CompletedProjects from "./pages/CompletedProjects";
// import axiosInstance from "../utils/axiosInstance";

// const MainContent = ({ activePage }) => {
//   const [showProfileInfo, setShowProfileInfo] = useState(false);
//   const [currentView, setCurrentView] = useState(activePage);
//   const [tasks, setTasks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleProfileClick = () => {
//     setShowProfileInfo(!showProfileInfo);
//   };

//   useEffect(()=>{
//     if(!localStorage.getItem("token")|| !localStorage.getItem("user")){
//       //navigate to role
//       window.location.href = "/role";
//     }
//   },[])

//   useEffect(() => {
//     console.log(localStorage.getItem("token"));
//     console.log(localStorage.getItem("user"));
//     setShowProfileInfo(false);
//     setCurrentView(activePage);
//     if (activePage === "tasks") {
//       fetchTasks();
//     }
//   }, [activePage]);

//   const fetchTasks = async () => {
//     try {
//       const response = await axiosInstance.post(
//         "/tasks/getEvalTasks",
//         {evaluator_id:localStorage.getItem("user"),
//           search:searchTerm
//         }
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
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value); // Update search term state
//   };
//   const handleSearchSubmit =(e)=>{
//     fetchTasks();
//   }
//   const handleTaskInterest = (taskId) => {
//     const updatedTasks = tasks.filter((task) => task.id !== taskId);
//     setTasks(updatedTasks);
//   };


//   return (
//     <div className="flex flex-col h-screen w-full">
//       <header className="flex justify-between items-center p-4 bg-white shadow-md w-full">
//         <h1 className="text-2xl font-bold">HELLO, Evaluator</h1>
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             placeholder="Search"
//             className="border rounded-md px-3 py-1"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//           <button
//             onClick={handleSearchSubmit}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md"
//           >
//             Search
//           </button>
//           <button onClick={handleProfileClick} className="text-gray-600">
//             <Avatar size="large" icon={<UserOutlined />} />
//           </button>
//         </div>
//       </header>
//       <div className="flex-1 overflow-y-auto p-4 w-full">
//         {showProfileInfo ? (
//           <ProfileInfo />
//         ) : (
//           <div className="w-full max-w-7xl mx-auto">
//             {currentView === "tasks" &&
//               tasks.map((task) => (
//                 <TaskCard
//                   key={task.id}
//                   task_id={task.id}
//                   title={task.name}
//                   description={task.description}
//                   tags={task.tags}
//                   onTaskInterest={handleTaskInterest}
//                 />
//               ))}
//             {currentView === "my projects" && <MyProjects />}
//             {currentView === "existing" && <CompletedProjects />}
//           </div>
//         )}
//       </div>
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
import CompletedProjects from "./pages/CompletedProjects";
import axiosInstance from "../utils/axiosInstance";
import EvaluatorHistory from "./pages/EvaluatorHistory";

const MainContent = ({ activePage }) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [currentView, setCurrentView] = useState(activePage);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleProfileClick = () => {
    setShowProfileInfo(!showProfileInfo);
  };

  useEffect(() => {
    if (!localStorage.getItem("token") || !localStorage.getItem("user")) {
      window.location.href = "/role";
    }
  }, []);

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("user"));
    setShowProfileInfo(false);
    setCurrentView(activePage);
    if (activePage === "tasks") {
      fetchTasks();
    }
  }, [activePage]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/tasks/getEvalTasks", {
        evaluator_id: localStorage.getItem("user"),
        search: searchTerm,
      });
      const result = response.data;
      if (result.success) {
        console.log("Tasks fetched successfully:", result.data);
        setTasks(result.data);
      } else {
        console.error("Failed to fetch tasks:", result.message);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    fetchTasks();
  };

  const handleTaskInterest = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const renderTasks = () => {
    if (isLoading) {
      return <div className="text-center py-4">Loading tasks...</div>;
    }

    if (tasks.length === 0) {
      return (
        <TaskCard
          task_id={null}
          title=""
          description=""
          tags={[]}
          onTaskInterest={() => {}}
        />
      );
    }

    return tasks.map((task) => (
      <TaskCard
        key={task.id}
        task_id={task.id}
        title={task.name}
        description={task.description}
        tags={task.tags}
        onTaskInterest={handleTaskInterest}
        createdAt={task.created_at}
        interestCount={task.interest_count}
      />
    ));
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <header className="flex justify-between items-center p-4 bg-white shadow-md w-full">
        <h1 className="text-2xl font-bold">HELLO, Evaluator</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-md px-3 py-1"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            onClick={handleSearchSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
          <button onClick={handleProfileClick} className="text-gray-600">
            <Avatar size="large" icon={<UserOutlined />} />
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-4 w-full">
        {showProfileInfo ? (
          <ProfileInfo />
        ) : (
          <div className="w-full max-w mx-auto">
            {currentView === "tasks" && renderTasks()}
            {currentView === "my projects" && <MyProjects />}
            {currentView === "existing" && <CompletedProjects />}
            {currentView === "history" && <EvaluatorHistory />}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;