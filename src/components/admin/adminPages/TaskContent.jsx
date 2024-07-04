import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => setShowCreateTask(true)}
        >
          Create New Task
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>

      {showCreateTask ? (
        <CreateNewTask
          onClose={() => setShowCreateTask(false)}
          onTaskCreated={handleTaskAdditionState}
        />
      ) : (
        <>
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by project name, tags ..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-2 pr-10 border rounded-md"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Filter className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {filteredTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagFilter(tag)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.tags.includes(tag)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
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
              <button
                onClick={handleClearFilters}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Clear Filters
              </button>
            </div>
          )}

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



// import React, { useState, useEffect } from "react";
// import { Filter, Bell, User, Search } from "lucide-react";
// import CreateNewTask from "./CreateNewTask";
// import TaskDetailsPopup from "./TaskDetailsPopup";
// import axiosInstance from "../../utils/axiosInstance";

// const TasksContent = () => {
//     const [tasks, setTasks] = useState([]);
//   const [showCreateTask, setShowCreateTask] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     status: "",
//     minPrice: "",
//     maxPrice: "",
//     tags: [],
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [pageSize] = useState(6);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [allTags, setAllTags] = useState([]);
//   const [tagSearch, setTagSearch] = useState("");


  
//   const fetchTasks = async () => {
//     try {
//       const response = await axiosInstance.post("tasks/getTasks", {
//         size: pageSize,
//         page: currentPage,
//       });
//       if (response.data.success) {
//         setTasks(response.data.data);
//         const total = response.data.meta.total;
//         const calculatedTotalPages = Math.ceil(total / pageSize);
//         setTotalPages(calculatedTotalPages);

//         // Extract all unique tags from tasks
//         const tags = [
//           ...new Set(response.data.data.flatMap((task) => task.tags)),
//         ];
//         setAllTags(tags);
//       }
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };
//   useEffect(() => {
//     fetchTasks();
//   }, [refreshKey]);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: parseInt(value, 10),
//     }));
//   };

//   const filteredTasks = tasks.filter((task) => {
//     const nameMatch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const priceMatch =
//       task.price >= filters.minPrice && task.price <= filters.maxPrice;
//     return nameMatch && priceMatch;
//   });

//   return (
//     <div className="container mx-auto px-4">
//       <header className="flex justify-between items-center py-4 border-b">
//         <h1 className="text-xl font-bold">HELLO , ADMIN</h1>
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             placeholder="Search"
//             className="border rounded-md px-3 py-1"
//           />
//           <Bell className="w-6 h-6 text-gray-500" />
//           <User className="w-6 h-6 text-gray-500" />
//         </div>
//       </header>

//       <main className="mt-8">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">Tasks</h2>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
//             onClick={() => setShowCreateTask(true)}
//           >
//             Create New Task
//             <svg
//               className="w-5 h-5 ml-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//               />
//             </svg>
//           </button>
//         </div>

//         <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between mb-6">
//           <div className="relative flex-grow mr-4">
//             <input
//               type="text"
//               placeholder="Search by project name, tags..."
//               value={searchTerm}
//               onChange={handleSearch}
//               className="w-full p-2 pl-10 border rounded-md"
//             />
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center text-gray-600"
//           >
//             <Filter className="w-5 h-5 mr-2" />
//             Filter
//           </button>
//         </div>

//         {showFilters && (
//           <div className="absolute right-0 mt-2 bg-white p-4 rounded-lg shadow-md z-10">
//             <h3 className="text-lg font-semibold mb-4">FILTERS</h3>
//             <div className="mb-4">
//               <h4 className="font-medium mb-2">Your Budget</h4>
//               <div className="flex justify-between">
//                 <span>₹{filters.minPrice}</span>
//                 <span>₹{filters.maxPrice}</span>
//               </div>
//               <input
//                 type="range"
//                 name="minPrice"
//                 min="500"
//                 max="5000"
//                 value={filters.minPrice}
//                 onChange={handleFilterChange}
//                 className="w-full mb-2"
//               />
//               <input
//                 type="range"
//                 name="maxPrice"
//                 min="500"
//                 max="5000"
//                 value={filters.maxPrice}
//                 onChange={handleFilterChange}
//                 className="w-full"
//               />
//               <div className="flex justify-between mt-2">
//                 <input
//                   type="number"
//                   name="minPrice"
//                   value={filters.minPrice}
//                   onChange={handleFilterChange}
//                   className="w-20 p-1 border rounded"
//                   placeholder="Price 1"
//                 />
//                 <input
//                   type="number"
//                   name="maxPrice"
//                   value={filters.maxPrice}
//                   onChange={handleFilterChange}
//                   className="w-20 p-1 border rounded"
//                   placeholder="Price 2"
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         <table className="w-full">
//           <thead>
//             <tr className="text-left text-gray-500 border-b">
//               <th className="pb-2">PROJECT NAME</th>
//               <th className="pb-2">DATE</th>
//               <th className="pb-2">TAGS</th>
//               <th className="pb-2">PRICE RANGE</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTasks.map((task) => (
//               <tr key={task.id} className="border-b">
//                 <td className="py-4">{task.name}</td>
//                 <td className="py-4">{new Date(task.created_at).toLocaleDateString()}</td>
//                 <td className="py-4">
//                   {task.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm mr-1"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </td>
//                 <td className="py-4">${task.price}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </main>

//       {showCreateTask && (
//         <CreateNewTask
//           onClose={() => setShowCreateTask(false)}
//           onTaskCreated={() => setRefreshKey((prev) => prev + 1)}
//         />
//       )}

//       {selectedTask && (
//         <TaskDetailsPopup
//           task={selectedTask}
//           onClose={() => setSelectedTask(null)}
//           onUpdate={() => setRefreshKey((prev) => prev + 1)}
//         />
//       )}
//     </div>
//   );
// };

// export default TasksContent;
