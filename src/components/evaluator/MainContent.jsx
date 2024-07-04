import React, { useState, useEffect } from "react";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Input, Button, Space } from "antd";
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

  const EvaluatorName = localStorage.getItem("name");

  const handleProfileClick = () => {
    setShowProfileInfo(!showProfileInfo);
  };

  useEffect(() => {
    if (!localStorage.getItem("token") || !localStorage.getItem("user")) {
      window.location.href = "/role";
    }
  }, []);

  useEffect(() => {
    setShowProfileInfo(false);
    setCurrentView(activePage);
    if (activePage === "tasks") {
      fetchTasks();
    }
  }, [activePage]);

  const fetchTasks = async (search = "") => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/tasks/getEvalTasks", {
        evaluator_id: localStorage.getItem("user"),
        search: search,
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

  const handleSearch = () => {
    fetchTasks(searchTerm.trim());
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
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
        <h1 className="text-2xl font-bold">HELLO, {EvaluatorName}</h1>
        <div className="flex items-center space-x-4">
          <button onClick={handleProfileClick} className="text-gray-600">
            <Avatar size="large" icon={<UserOutlined />} />
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-4 w-full">
        {showProfileInfo ? (
          <ProfileInfo onClose={handleProfileClick}/>
        ) : (
          <div className="w-full max-w mx-auto">
            {currentView === "tasks" && (
              <>
                <div className="w-full mb-4 flex items-center">
                  <Input
                    placeholder="Search by project name, tags ..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onPressEnter={handleSearch}
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      height: "40px",
                    }}
                  />
                  <Button
                    type="primary"
                    onClick={handleSearch}
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Search
                  </Button>
                </div>

                {renderTasks()}
              </>
            )}
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
