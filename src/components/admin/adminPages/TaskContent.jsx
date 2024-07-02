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
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [allTags, setAllTags] = useState([]);
  const [tagSearch, setTagSearch] = useState("");

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

        // Extract all unique tags from tasks
        const tags = [
          ...new Set(response.data.data.flatMap((task) => task.tags)),
        ];
        setAllTags(tags);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshKey, currentPage]);

  const handleTaskAdditionState = () => {
    fetchTasks();
  };

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

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({
      status: "",
      minPrice: "",
      maxPrice: "",
      tags: [],
    });
    setTagSearch("");
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axiosInstance.post("tasks/createTask", {
        is_delete: 1,
        id: taskId,
      });
      if (response.ok) {
        console.log("Task deleted successfully");
        setSelectedTask(null);
        setRefreshKey((prevKey) => prevKey + 1);
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const nameMatch = task.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const tagMatch =
      filters.tags.length === 0 ||
      filters.tags.some((tag) => task.tags.includes(tag));
    const priceMatch =
      (!filters.minPrice || task.lower_price >= parseFloat(filters.minPrice)) &&
      (!filters.maxPrice || task.higher_price <= parseFloat(filters.maxPrice));
    return nameMatch && tagMatch && priceMatch;
  });

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
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

  const filteredTags = allTags.filter((tag) =>
    tag.toLowerCase().includes(tagSearch.toLowerCase())
  );

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
          onTaskCreated={handleTaskAdditionState}
        />
      ) : (
        <>
          {/* Search and filter UI */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 border rounded-md"
            />
            <div className="mt-2 flex justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gray-200 px-4 py-2 rounded-md"
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
              <button
                onClick={handleClearFilters}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Clear Filters
              </button>
            </div>
            {showFilters && (
              <div className="mt-4 p-4 border rounded-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Min Price</label>
                    <input
                      type="number"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Max Price</label>
                    <input
                      type="number"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block mb-2">Tags</label>
                  <input
                    type="text"
                    placeholder="Search tags..."
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    className="w-full p-2 border rounded-md mb-2"
                  />
                </div>
              </div>
            )}
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="pb-4">TASK NAME</th>
                <th className="pb-4">DATE</th>
                <th className="pb-4">TAGS</th>
                <th className="pb-4">PRICE RANGE(In Rs)</th>
                <th className="pb-4">STATUS</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="border-t border-gray-200">
                  <td className="py-4">{task.name}</td>
                  <td className="py-4">
                    {new Date(task.created_at).toLocaleDateString()}
                  </td>
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
                  <td className="py-4">
                    {task.lower_price} - {task.higher_price}
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-md ${
                        task.is_completed
                          ? "bg-green-100 text-green-800"
                          : task.is_assigned
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {task.is_completed
                        ? "Completed"
                        : task.is_assigned
                        ? "Assigned"
                        : "Open"}
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
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => handlePageClick(page)}
              >
                {page + 1}
              </button>
            ))}
            <button
              className={`px-4 py-2 bg-gray-200 rounded-md ${
                currentPage === totalPages - 1
                  ? "cursor-not-allowed"
                  : "hover:bg-gray-300"
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
          onUpdate={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default TasksContent;
