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
  const [refreshKey, setRefreshKey] = useState(0);

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
  }, [refreshKey]);

  const handleCreateTask = (newTaskData) => {
    // Implementation for creating a new task
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

  const handleViewTask = async (taskId) => {
    try {
      const response = await axios.post("http://localhost:3001/api/tasks/getTasks", { id: taskId });
      if (response.data.success) {
        setSelectedTask(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

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
                      onClick={() => handleViewTask(task.id)}
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
          onClose={() => setSelectedTask(null)}
          onDelete={() => handleDeleteTask(selectedTask.id)}
        />
      )}
    </div>
  );
};

export default TasksContent;