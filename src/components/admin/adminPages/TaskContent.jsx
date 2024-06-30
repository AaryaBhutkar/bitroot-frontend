import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateNewTask from "./CreateNewTask";
import TaskDetailsPopup from "./TaskDetailsPopup";
import axiosInstance from "../../utils/axiosInstance";

const TasksContent = () => {
  const [tasks, setTasks] = useState([]);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    minPrice: "",
    maxPrice: "",
    tags: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [pageSize] = useState(6); // Default page size
  const [currentPage, setCurrentPage] = useState(0); // Page starts from 0
  const [totalPages, setTotalPages] = useState(0); 
  
  const fetchTasks = async () => {
      try {
        const response = await axiosInstance.post("tasks/getTasks", {
          size: pageSize,
          page: currentPage,
        });
        if (response.data.success) {
          setTasks(response.data.data);
          const total = response.data.meta.total;
        const calculatedTotalPages = Math.ceil(total / pageSize);
        setTotalPages(calculatedTotalPages);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

  useEffect(() => {
    
    fetchTasks();
  }, [refreshKey,currentPage]);

  const handleCreateTask = (newTaskData) => {
    // Update tasks using the functional update pattern
  };
  const handleTaskAdditionState=()=>{
    fetchTasks();
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleTagFilter = (tag) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      tags: prevFilters.tags.includes(tag)
        ? prevFilters.tags.filter((t) => t !== tag)
        : [...prevFilters.tags, tag],
    }));
  };

  const handleViewTask = async (task) => {
    try {
      console.log(task);
      // const response = await axios.post("http://localhost:3001/api/tasks/getTasks", { id: taskId });
      // if (response.data.success) {
        setSelectedTask(task);
      // }
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axiosInstance.post("tasks/createTask", {is_delete:1 ,id:taskId });

      if (response.ok) {
        console.log('Task deleted successfully');
        setSelectedTask(null);
        setRefreshKey((prevKey) => prevKey + 1);
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    // Implement your filtering logic here
    return true; // Placeholder
  });

  const allTags = [...new Set(tasks.flatMap((task) => task.tags))];
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };


  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Adjust as needed
    const total = totalPages;

    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(currentPage - halfVisiblePages, 0);
      let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 0);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setShowCreateTask(true)}
        >
          Create New Task
        </button>
      </div>

      {showCreateTask ? (
        <CreateNewTask
          onClose={() => setShowCreateTask(false)}
          onSubmit={handleCreateTask}
          onTaskCreated={handleTaskAdditionState}
        />
      ) : (
        <>
          {/* Search and filter UI */}
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="pb-4">PROJECT NAME</th>
                <th className="pb-4">DATE</th>
                <th className="pb-4">TAGS</th>
                <th className="pb-4">PRICE RANGE</th>
                <th className="pb-4">STATUS</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="border-t border-gray-200">
                  <td className="py-4">{task.name}</td>
                  <td className="py-4">{new Date(task.created_at).toLocaleDateString()}</td>
                  <td className="py-4">
                    {task.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm mr-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </td>
                  <td className="py-4">${task.lower_price} - ${task.higher_price}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-md ${
                        task.is_assigned ? "bg-yellow-100 text-yellow-800" :
                        task.is_completed ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }`}
                    >
                      {task.is_assigned ? "Assigned" : task.is_completed ? "Complete" : "Open"}
                    </span>
                  </td>
                  <td className="py-4">
                    <button
                      className="bg-blue-100 text-blue-800 px-4 py-1 rounded-md"
                      onClick={() => handleViewTask(task)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            {/* Pagination controls */}
          <div className="flex justify-end mt-4">
            <button
              className={`px-4 py-2 mr-2 bg-gray-200 rounded-md ${
                currentPage === 0 ? "cursor-not-allowed" : "hover:bg-gray-300"
              }`}
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                className={`px-4 py-2 mr-2 bg-gray-200 rounded-md ${
                  currentPage === page ? "bg-blue-500 text-white" : "hover:bg-gray-300"
                }`}
                onClick={() => handlePageClick(page)}
              >
                {page + 1}
              </button>
            ))}
            <button
              className={`px-4 py-2 bg-gray-200 rounded-md ${
                currentPage === totalPages - 1 ? "cursor-not-allowed" : "hover:bg-gray-300"
              }`}
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        </>
      )}

      {selectedTask && (
        <TaskDetailsPopup
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onDelete={() => handleDeleteTask(selectedTask.id)}
        />
      )}
    </div>
  );
};

export default TasksContent;