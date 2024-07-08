// import React, { useState, useEffect, useRef } from "react";
// import { Filter } from "lucide-react";
// import axiosInstance from "../../utils/axiosInstance";
// import CreateNewTask from "./CreateNewTask";
// import TaskDetailsPopup from "./TaskDetailsPopup";

// const TasksContent = () => {
//   const [tasks, setTasks] = useState([]);
//   const [showCreateTask, setShowCreateTask] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     status: "",
//     minPrice: 0,
//     maxPrice: 10000,
//     tags: [],
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const [pageSize] = useState(6);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [allTags, setAllTags] = useState([]);
//   const [tagSearch, setTagSearch] = useState("");

//   const filterRef = useRef(null);

//   useEffect(() => {
//     getTasks();
    

//     const handleClickOutside = (event) => {
//       if (filterRef.current && !filterRef.current.contains(event.target)) {
//         setShowFilters(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);


//   const getTasks = async () => {
//     try {
//       const response = await axiosInstance.post("tasks/getTasks", {
//         size: pageSize,
//         page: currentPage,
//         lower_price: filters.minPrice,
//         higher_price: filters.maxPrice,
//         search:searchTerm,
//         status:filters.status
        

//       });
//       if (response.data.success) {
//         setTasks(response.data.data);
//         const total = response.data.meta.total;
//         const calculatedTotalPages = Math.ceil(total / pageSize);
//         setTotalPages(calculatedTotalPages);
//       }
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     if (e.key === 'Enter') {
//       getTasks();
//     }
//   };

//   const handleSearchClear = () => {
//     setSearchTerm("");
//     getTasks();
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//     console.log(filters);
//   };

//   const handleTagFilter = (tag) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       tags: prevFilters.tags.includes(tag)
//         ? prevFilters.tags.filter((t) => t !== tag)
//         : [...prevFilters.tags, tag],
//     }));
//   };

//   const handleClearFilters = () => {
//     setSearchTerm("");
//     setFilters({
//       status: "",
//       minPrice: 0,
//       maxPrice: 10000,
//       tags: [],
//     });
//     setTagSearch("");
//     getTasks();
//   };

//   const handleApplyFilters = () => {
//     setCurrentPage(0);
//     getTasks();
//     setShowFilters(false);
//   };

//   const handleViewTask = (task) => {
//     setSelectedTask(task);
//   };

//   const handleDeleteTask = async (taskId) => {
//     try {
//       const response = await axiosInstance.post("tasks/createTask", {
//         is_delete: 1,
//         id: taskId,
//       });
//       if (response.data.success) {
//         console.log("Task deleted successfully");
//         setSelectedTask(null);
//         getTasks();
//       } else {
//         console.error("Failed to delete task");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//     getTasks();
//   };

//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxVisiblePages = 5;
//     if (totalPages <= maxVisiblePages) {
//       for (let i = 0; i < totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       const halfVisiblePages = Math.floor(maxVisiblePages / 2);
//       let startPage = Math.max(currentPage - halfVisiblePages, 0);
//       let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);
//       if (endPage - startPage < maxVisiblePages - 1) {
//         startPage = Math.max(endPage - maxVisiblePages + 1, 0);
//       }
//       for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//       }
//     }
//     return pageNumbers;
//   };

//   const filteredTags = allTags.filter((tag) =>
//     tag.toLowerCase().includes(tagSearch.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Tasks</h1>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
//           onClick={() => setShowCreateTask(true)}
//         >
//           Create New Task
//           <svg
//             className="w-5 h-5 ml-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//             />
//           </svg>
//         </button>
//       </div>

//       {showCreateTask ? (
//         <CreateNewTask
//           onClose={() => setShowCreateTask(false)}
//           onTaskCreated={getTasks}
//         />
//       ) : (
//         <>
//           <div className="mb-6 relative">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search by task name and tags"
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 onKeyPress={handleSearch}
//                 className="w-full p-2 pr-10 border rounded-md"
//               />
//               {searchTerm && (
//                 <button
//                   onClick={handleSearchClear}
//                   className="absolute right-10 top-1/2 transform -translate-y-1/2"
//                 >
//                   ✕
//                 </button>
//               )}
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2"
//               >
//                 <Filter className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
//             {showFilters && (
//               <div
//                 ref={filterRef}
//                 className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-10 p-4"
//               >
//                 {/* Filter content remains the same */}
//                 {/* ... */}
//               <h3 className="text-lg font-semibold mb-2">Filters</h3>
//                  <div className="mb-4">
//                    <label className="block text-sm font-medium text-gray-700">Your Budget</label>
//                    <div className="flex items-center space-x-2">
//                      <span>₹{filters.minPrice}</span>
//                      <input
//                       type="range"
//                       min="0"
//                       max="10000"
//                       step="100"
//                       value={filters.maxPrice}
//                       onChange={(e) =>
//                         setFilters((prev) => ({ ...prev, maxPrice: parseInt(e.target.value) }))
//                       }
//                       className="w-full"
//                     />
//                     <span>₹{filters.maxPrice}</span>
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">Status</label>
//                   <select
//                     name="status"
//                     value={filters.status}
//                     onChange={handleFilterChange}
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//                   >
//                     <option value="">All</option>
//                     <option value="open">Open</option>
//                     <option value="assigned">Assigned</option>
//                     <option value="completed">Completed</option>
//                   </select>
//                 </div>
                
//                 <div className="flex justify-between">
//                   <button
//                     onClick={handleClearFilters}
//                     className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
//                   >
//                     Clear
//                   </button>
//                   <button
//                     onClick={handleApplyFilters}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                   >
//                     Apply Filters
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           <table className="w-full">
//             {/* Table content remains the same */}
//             {/* ... */}
//            <thead>
//                <tr className="text-left text-gray-500">
//                  <th className="pb-4">TASK NAME</th>
//                  <th className="pb-4">DATE</th>
//                  <th className="pb-4">TAGS</th>
//                  <th className="pb-4">PRICE RANGE (₹)</th>
//                 <th className="pb-4">STATUS</th>
//                  <th className="pb-4"></th>
//                </tr>
//              </thead>
//              <tbody>
//                {tasks.map((task) => (
//                 <tr key={task.id} className="border-t border-gray-200">
//                   <td className="py-4">{task.name}</td>
//                   <td className="py-4">
//                     {new Date(task.created_at).toLocaleDateString()}
//                   </td>
//                   <td className="py-4">
//                     {task.tags.map((tag, index) => (
//                       <span
//                         key={index}
//                         className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm mr-1"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </td>
//                   <td className="py-4">
//                     {task.lower_price} - {task.higher_price}
//                   </td>
//                   <td className="py-4">
//                     <span
//                       className={`px-2 py-1 rounded-md ${
//                         task.is_completed
//                           ? "bg-gray-200 text-green-800"
//                           : task.is_assigned
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-green-300 text-black"
//                       }`}
//                     >
//                       {task.is_completed
//                         ? "Completed"
//                         : task.is_assigned
//                         ? "Assigned"
//                         : "Open"}
//                     </span>
//                   </td>
//                   <td className="py-4">
//                     <button
//                       className="bg-blue-100 text-blue-800 px-4 py-1 rounded-md"
//                       onClick={() => handleViewTask(task)}
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//             <div className="pagination-container fixed bottom-0 w-full bg-white pb-20 flex ">
//               <nav>
//                 <ul className="flex items-center space-x-2">
//                   <li>
//                     <button
//                       className={`px-3 py-1 border rounded-md ${
//                         currentPage === 0
//                           ? "cursor-not-allowed opacity-50"
//                           : "hover:bg-gray-200"
//                       }`}
//                       onClick={() => handlePageClick(currentPage - 1)}
//                       disabled={currentPage === 0}
//                     >
//                       &lt;
//                     </button>
//                   </li>
//                   {getPageNumbers().map((page) => (
//                     <li key={page}>
//                       <button
//                         className={`px-3 py-1 border rounded-md ${
//                           currentPage === page
//                             ? "bg-blue-500 text-white"
//                             : "hover:bg-gray-200"
//                         }`}
//                         onClick={() => handlePageClick(page)}
//                       >
//                         {page + 1}
//                       </button>
//                     </li>
//                   ))}
//                   <li>
//                     <button
//                       className={`px-3 py-1 border rounded-md ${
//                         currentPage === totalPages - 1
//                           ? "cursor-not-allowed opacity-50"
//                           : "hover:bg-gray-200"
//                       }`}
//                       onClick={() => handlePageClick(currentPage + 1)}
//                       disabled={currentPage === totalPages - 1}
//                     >
//                       &gt;
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>

//         </>
//       )}

//       {selectedTask && (
//         <TaskDetailsPopup
//           task={selectedTask}
//           onClose={() => setSelectedTask(null)}
//           onDelete={() => handleDeleteTask(selectedTask.id)}
//           onUpdate={getTasks}
//         />
//       )}
//     </div>
//   );
// };

// export default TasksContent;








// TasksContent.jsx
import React, { useState, useEffect, useRef } from "react";
import { Filter } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import CreateNewTask from "./CreateNewTask";
import TaskDetailsPopup from "./TaskDetailsPopup";
import TaskRow from "./TaskRow";
import Pagination from "./Pagination";

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
  });
  const [showFilters, setShowFilters] = useState(false);
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const filterRef = useRef(null);

  useEffect(() => {
    getTasks();

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

  const getTasks = async (search = searchTerm) => {
    try {
      const response = await axiosInstance.post("tasks/getTasks", {
        size: pageSize,
        page: currentPage,
        lower_price: filters.minPrice,
        higher_price: filters.maxPrice,
        search: search,
        status: filters.status,
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.key === 'Enter') {
      getTasks();
    }
  };

  const handleSearchClear = () => {
    setSearchTerm("");
    getTasks("");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({
      status: "",
      minPrice: 0,
      maxPrice: 10000,
      tags: [],
    });
    getTasks();
  };

  const handleApplyFilters = () => {
    setCurrentPage(0);
    getTasks();
    setShowFilters(false);
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
      if (response.data.success) {
        console.log("Task deleted successfully");
        setSelectedTask(null);
        getTasks();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getTasks();
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Tasks</h1>
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
          onTaskCreated={getTasks}
        />
      ) : (
        <>
          <div className="mb-6 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by task name and tags"
                value={searchTerm}
                onChange={handleSearch}
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
              </button>
            </div>
            {showFilters && (
              <div
                ref={filterRef}
                className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-10 p-4"
              >
                <h3 className="text-lg font-semibold mb-2">Filters</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Your Budget</label>
                  <div className="flex items-center space-x-2">
                    <span>₹{filters.minPrice}</span>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, maxPrice: parseInt(e.target.value) }))
                      }
                      className="w-full"
                    />
                    <span>₹{filters.maxPrice}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
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

          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="text-left text-gray-500 text-xl">
                  <th className="pb-4 px-2">TASK NAME</th>
                  <th className="pb-4 px-2">DATE</th>
                  <th className="pb-4 px-2">TAGS</th>
                  <th className="pb-4 px-2">PRICE RANGE (₹)</th>
                  <th className="pb-4 px-2">STATUS</th>
                  <th className="pb-4 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <TaskRow key={task.id} task={task} onViewTask={handleViewTask} />
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {selectedTask && (
        <TaskDetailsPopup
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onDelete={() => handleDeleteTask(selectedTask.id)}
          onUpdate={getTasks}
        />
      )}
    </div>
  );
};

export default TasksContent;