import React, { useState, useEffect, useRef, useCallback } from "react";
import { Filter, ArrowUp, ArrowDown } from "lucide-react";
import { debounce } from "lodash";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import CreateNewTask from "./CreateNewTask";
import TaskDetailsPopup from "./TaskDetailsPopup";
import MobileTaskCard from "./MobileTaskCard";

const TasksContent = () => {
  const [tasks, setTasks] = useState([]);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    minPrice: 0,
    maxPrice: 10000,
    tags: [],
    startDate: "",
    endDate: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filterRef = useRef(null);

  const getTasks = async (page = currentPage) => {
    try {
      const response = await axiosInstance.post("tasks/getTasks", {
        size: pageSize,
        page: page,
        lower_price: filters.minPrice,
        higher_price: filters.maxPrice,
        search: searchTerm,
        status: filters.status,
        start_date: filters.startDate,
        end_date: filters.endDate,
        sort: sortOrder,
      });
      if (response.data.success) {
        setTasks(response.data.data);
        const total = response.data.meta.total;
        setTotalPages(Math.ceil(total / pageSize));
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    getTasks(0);

    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    getTasks(0);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      getTasks(0);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchTerm("");
    getTasks(0);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({
      status: "",
      minPrice: 0,
      maxPrice: 10000,
      tags: [],
      startDate: "",
      endDate: "",
    });
    setIsFiltered(false);
    getTasks(0);
    toast.success("Filters cleared");
  };

  const handleApplyFilters = () => {
    setIsFiltered(true);
    getTasks(0);
    setShowFilters(false);
    toast.success("Filters applied");
  };

  const handleViewTask = (task) => setSelectedTask(task);

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axiosInstance.post("tasks/createTask", {
        is_delete: 1,
        id: taskId,
      });
      if (response.data.success) {
        setSelectedTask(null);
        getTasks(currentPage);
        toast.success("Task deleted successfully");
      } else {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error deleting task");
    }
  };

  const handlePageClick = (page) => {
    getTasks(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const totalPagesArray = [...Array(totalPages).keys()];

    if (totalPages <= maxVisiblePages) {
      return totalPagesArray;
    }

    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(currentPage - halfVisiblePages, 0);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 0);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700"
          onClick={() => setShowCreateTask(true)}
        >
          Create New Task +
        </button>
      </div>

      {showCreateTask ? (
        <CreateNewTask
          onClose={() => setShowCreateTask(false)}
          onTaskCreated={() => getTasks(0)}
        />
      ) : (
        <div className="flex flex-col h-full">
          <div className="mb-6 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by task name, tags and description"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleSearch}
                className="w-full p-2 pr-10 border rounded-md"
              />
              {searchTerm && (
                <button
                  onClick={handleSearchClear}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2"
                >
                  ✕
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Filter className="w-5 h-5 text-gray-500" />
                {isFiltered && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            </div>
            {showFilters && (
              <div
                ref={filterRef}
                className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-10 p-4"
              >
                <h3 className="text-lg font-semibold mb-2">Filters</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Budget
                  </label>
                  <div className="flex items-center space-x-2">
                    <span>₹{filters.minPrice}</span>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          maxPrice: parseInt(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                    <span>₹{filters.maxPrice}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">All</option>
                    <option value="open">Open</option>
                    <option value="assigned">Assigned</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handleClearFilters}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex-grow overflow-hidden">
            <div className="h-full flex flex-col">
              {isMobile ? (
                <div className="overflow-y-auto flex-grow mb-8">
                  {tasks.map((task) => (
                    <MobileTaskCard
                      key={task.id}
                      task={task}
                      onViewTask={handleViewTask}
                    />
                  ))}
                </div>
              ) : (
                <>
            2<div className="overflow-x-auto overflow-y-auto">
                    <table className="min-w-full bg-white divide-y divide-gray-200">
                      <thead>
                        <tr className="text-left text-gray-500">
                          <th className="pb-4 w-[19%]">TASK NAME</th>
                          <th className="pb-4 w-[9%]">
                            <div className="flex items-center">
                              DATE
                              <button onClick={handleSort} className="ml-2">
                                {sortOrder === "asc" ? (
                                  <ArrowUp className="w-4 h-4" />
                                ) : (
                                  <ArrowDown className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </th>
                          <th className="pb-4 w-[38%]">TAGS</th>
                          <th className="pb-4 w-[16%]">PRICE RANGE</th>
                          <th className="pb-4 w-[10%]">STATUS</th>
                          <th className="pb-4 w-[8%]"></th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div className="overflow-y-auto flex-grow">
                    <table className="min-w-full bg-white divide-y divide-gray-200">
                      <tbody>
                        {tasks.map((task) => (
                          <tr
                            key={task.id}
                            className="border-t border-gray-200"
                          >
                            <td className="py-4 md:py-4 text-sm md:text-base w-[19%]">
                              {task.name}
                            </td>
                            <td className="py-4 md:py-4 text-sm md:text-base w-[9%]">
                              {new Date(task.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4 md:py-4 w-[38%]">
                              <div className="flex flex-wrap gap-1">
                                {task.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm whitespace-nowrap"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-2 md:py-4 text-sm md:text-base w-[16%]">
                              ₹{task.lower_price} - ₹{task.higher_price}
                            </td>
                            <td className="py-2 md:py-4 w-[10%]">
                              <span
                                className={`px-1 py-0.5 md:px-2 md:py-1 rounded-md text-xs md:text-sm ${
                                  task.is_completed
                                    ? "bg-gray-200 text-green-800"
                                    : task.is_assigned
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-300 text-black"
                                }`}
                              >
                                {task.is_completed
                                  ? "Completed"
                                  : task.is_assigned
                                  ? "Assigned"
                                  : "Open"}
                              </span>
                            </td>
                            <td className="py-2 md:py-4 w-[8%]">
                              <button
                                className="bg-blue-100 text-blue-800 px-2 py-1 md:px-4 md:py-1 rounded-md text-xs md:text-sm"
                                onClick={() => handleViewTask(task)}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="pagination-container fixed bottom-0 w-auto bg-white p-2 flex justify-start items-center">
            <nav className="flex items-center space-x-1 md:space-x-2">
              <button
                className={`px-2 py-1 md:px-3 md:py-1 border rounded-md text-sm md:text-base ${
                  currentPage === 0
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 0}
              >
                &lt;
              </button>
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  className={`px-2 py-1 md:px-3 md:py-1 border rounded-md text-sm md:text-base ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => handlePageClick(page)}
                >
                  {page + 1}
                </button>
              ))}
              <button
                className={`px-2 py-1 md:px-3 md:py-1 border rounded-md text-sm md:text-base ${
                  currentPage === totalPages - 1
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              >
                &gt;
              </button>
            </nav>
          </div>
        </div>
      )}

      {selectedTask && (
        <TaskDetailsPopup
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onDelete={() => handleDeleteTask(selectedTask.id)}
          onUpdate={() => getTasks(currentPage)}
        />
      )}
    </div>
  );
};

export default TasksContent;
