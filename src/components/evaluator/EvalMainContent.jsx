import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Input, Button, Popover, Space, notification } from "antd";
import TaskCard from "./pages/TaskCard";
import ProfileInfo from "../admin/adminPages/ProfileInfo";
import MyProjects from "./pages/MyProjects";
import CompletedProjects from "./pages/CompletedProjects";
import axiosInstance from "../utils/axiosInstance";
import EvaluatorHistory from "./pages/EvaluatorHistory";

const EvalMainContent = ({ activePage }) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [currentView, setCurrentView] = useState(activePage);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const EvaluatorName = localStorage.getItem("name");

  const handleOpenChange = (open) => {
    setPopoverOpen(open);
  };

  const handleProfileClick = () => {
    setShowProfileInfo(true);
    setPopoverOpen(false);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   window.location.href = "/role";
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    notification.success({
      message: 'Logout Successful',
      description: 'You have been logged out successfully.',
    });
    window.location.href = "/login";
  };

  useEffect(() => {
    console.log("check user_id",parseInt(localStorage.getItem("user"))>0);
    if (!localStorage.getItem("token") || !localStorage.getItem("user") ) {
      window.location.href = "/login";
    }
    if(parseInt(localStorage.getItem("user"))>0){

    }else{
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
        isAssigned={task.is_assigned === 1}
        inProgress={task.in_progress === 1}
        updatedAt={task.updated_at}
      />
    ));
  };

  const popoverContent = (
    <Space direction="vertical">
      <Button
        className="w-full text-white text-left bg-blue-500 hover:bg-blue-700 block"
        onClick={handleProfileClick}
      >
        Profile
      </Button>
      <Button
        className="w-full text-white text-left bg-blue-500 hover:bg-blue-700 block"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Space>
  );

  return (
    <div className="flex flex-col h-screen w-full">
      <header className="flex justify-between items-center p-4 bg-white shadow-md w-full">
        <h1 className="text-2xl font-bold">HELLO, {EvaluatorName}</h1>
        <div className="flex items-center space-x-4">
          <Popover
            content={popoverContent}
            title=""
            trigger="click"
            open={popoverOpen}
            onOpenChange={handleOpenChange}
          >
            <Avatar size="large" icon={<UserOutlined />} />
          </Popover>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-4 w-full">
        {showProfileInfo ? (
          <ProfileInfo onClose={() => setShowProfileInfo(false)} />
        ) : (
          <div className="w-full max-w mx-auto">
            {activePage === "tasks" && (
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
            {activePage === "my projects" && <MyProjects />}
            {activePage === "completed" && <CompletedProjects />}
            {activePage === "history" && <EvaluatorHistory />}
          </div>
        )}
      </div>
    </div>
  );
};

export default EvalMainContent;