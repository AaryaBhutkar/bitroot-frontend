import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateNewTask from "./CreateNewTask";
import TaskDetailsPopup from "./TaskDetailsPopup";

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
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger page refresh

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.post("http://localhost:3001/api/tasks/getTasks");
        if (response.data.success) {
          setTasks(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [refreshKey]); // Refresh when refreshKey changes

  const handleCreateTask = (newTaskData) => {
    const newTask = {
      id: tasks.length + 1,
      projectName: newTaskData.projectName,
      date: new Date().toLocaleDateString(),
      tags: newTaskData.tags.split(",").map((tag) => tag.trim()),
      priceRange: `$${newTaskData.priceRangeMin} - $${newTaskData.priceRangeMax}`,
      status: "Assigned",
    };
    setTasks([...tasks, newTask]);
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

  const handleViewTask = (task) => {
    setSelectedTask(task);
  };

  const handleClosePopup = () => {
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags.some((tag) =>
        tag.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      filters.status === "" || task.status === filters.status;
    const matchesPrice =
      (filters.minPrice === "" ||
        task.lower_price >= Number(filters.minPrice)) &&
      (filters.maxPrice === "" || task.higher_price <= Number(filters.maxPrice));
    const matchesTags =
      filters.tags.length === 0 ||
      filters.tags.every((tag) => task.tags.includes(Number(tag)));

    return matchesSearch && matchesStatus && matchesPrice && matchesTags;
  });

  const allTags = [...new Set(tasks.flatMap((task) => task.tags))];

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks/createTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({is_delete:1 ,id:taskId }),
      });

      if (response.ok) {
        // Handle successful deletion (e.g., update state to remove task from list)
        console.log('Task deleted successfully');
        setSelectedTask(null); // Close the popup
        setRefreshKey((prevKey) => prevKey + 1); // Trigger page refresh
      } else {
        // Handle error response
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
        />
      ) : (
        <>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search by project name, tags..."
                className="w-full mr-4 p-2 rounded-md border border-gray-300"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button
                className="bg-white px-4 py-2 rounded-md border border-gray-300"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Status:</label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full p-2 rounded-md border border-gray-300"
                  >
                    <option value="">All</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Complete">Complete</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Price Range:</label>
                  <div className="flex">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="w-1/2 mr-2 p-2 rounded-md border border-gray-300"
                    />
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="w-1/2 p-2 rounded-md border border-gray-300"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block mb-2">Tags:</label>
                  <div className="flex flex-wrap">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagFilter(tag)}
                        className={`mr-2 mb-2 px-2 py-1 rounded-md ${
                          filters.tags.includes(tag.toString())
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

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
                        task.is_approved
                          ? "bg-green-100 text-green-800"
                          : task.is_completed
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {task.is_approved ? "Approved" : task.is_completed ? "Complete" : "Assigned"}
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
        </>
      )}

      {selectedTask && (
        <TaskDetailsPopup
          task={selectedTask}
          onClose={handleClosePopup}
          onDelete={() => handleDeleteTask(selectedTask.id)}
        />
      )}
    </div>
  );
};

export default TasksContent;
