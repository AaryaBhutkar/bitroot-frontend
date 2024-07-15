// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { Filter, ArrowUp, ArrowDown } from "lucide-react";
// import { debounce } from "lodash";
// import { toast } from "react-hot-toast";
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
//     startDate: "",
//     endDate: "",
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const [pageSize] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [isFiltered, setIsFiltered] = useState(false);

//   const filterRef = useRef(null);

//   const getTasks = useCallback(
//     async (page = 0) => {
//       try {
//         const response = await axiosInstance.post("tasks/getTasks", {
//           size: pageSize,
//           page: page,
//           lower_price: filters.minPrice,
//           higher_price: filters.maxPrice,
//           search: searchTerm,
//           status: filters.status,
//           start_date: filters.startDate,
//           end_date: filters.endDate,
//           sort: sortOrder,
//         });
//         if (response.data.success) {
//           setTasks(response.data.data);
//           const total = response.data.meta.total;
//           const calculatedTotalPages = Math.ceil(total / pageSize);
//           setTotalPages(calculatedTotalPages);
//           setCurrentPage(page + 1);
//         }
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         toast.error("Failed to fetch tasks. Please try again.");
//       }
//     },
//     [filters, searchTerm, pageSize, sortOrder]
//   );

//   useEffect(() => {
//     getTasks(0);
//   }, [getTasks]);

//   useEffect(() => {
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

//   const handleSearch = (e) => {
//     if (e.key === "Enter") {
//       setCurrentPage(1);
//       getTasks(0);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearchClear = () => {
//     setSearchTerm("");
//     setCurrentPage(1);
//     getTasks(0);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };

//   const handleClearFilters = () => {
//     setSearchTerm("");
//     setFilters({
//       status: "",
//       minPrice: 0,
//       maxPrice: 10000,
//       tags: [],
//       startDate: "",
//       endDate: "",
//     });
//     setIsFiltered(false);
//     toast.success("Filters cleared");
//   };

//   const handleApplyFilters = () => {
//     setCurrentPage(1);
//     setIsFiltered(true);
//     getTasks(0);
//     setShowFilters(false);
//     toast.success("Filters applied");
//   };

//   const handleSort = () => {
//     const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
//     setSortOrder(newSortOrder);
//     getTasks(currentPage - 1);
//   };

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//     getTasks(page - 1);
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
//         setSelectedTask(null);
//         getTasks(currentPage - 1);
//         toast.success("Task deleted successfully");
//       } else {
//         toast.error("Failed to delete task");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("Error deleting task");
//     }
//   };

//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxVisiblePages = 5;
//     const halfVisiblePages = Math.floor(maxVisiblePages / 2);

//     let startPage = Math.max(currentPage - halfVisiblePages, 1);
//     let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

//     if (endPage - startPage < maxVisiblePages - 1) {
//       startPage = Math.max(endPage - maxVisiblePages + 1, 1);
//     }

//     if (startPage > 1) {
//       pageNumbers.push(1);
//       if (startPage > 2) pageNumbers.push("...");
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }

//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) pageNumbers.push("...");
//       pageNumbers.push(totalPages);
//     }

//     return pageNumbers;
//   };

//   return (
//     <div className="p-6 md:p-6">
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
//           onTaskCreated={() => getTasks(0)}
//         />
//       ) : (
//         <>
//           <div className="mb-6 relative">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search by task name, tags and description"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 onKeyDown={handleSearch}
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
//                 {isFiltered && (
//                   <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//                 )}
//               </button>
//             </div>
//             {showFilters && (
//               <div
//                 ref={filterRef}
//                 className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-10 p-4"
//               >
//                 <h3 className="text-lg font-semibold mb-2">Filters</h3>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Your Budget
//                   </label>
//                   <div className="flex items-center space-x-2">
//                     <span>₹{filters.minPrice}</span>
//                     <input
//                       type="range"
//                       min="0"
//                       max="10000"
//                       step="100"
//                       value={filters.maxPrice}
//                       onChange={(e) =>
//                         setFilters((prev) => ({
//                           ...prev,
//                           maxPrice: parseInt(e.target.value),
//                         }))
//                       }
//                       className="w-full"
//                     />
//                     <span>₹{filters.maxPrice}</span>
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Status
//                   </label>
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
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Start Date
//                   </label>
//                   <input
//                     type="date"
//                     name="startDate"
//                     value={filters.startDate}
//                     onChange={handleFilterChange}
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     End Date
//                   </label>
//                   <input
//                     type="date"
//                     name="endDate"
//                     value={filters.endDate}
//                     onChange={handleFilterChange}
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//                   />
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
//           <div className="overflow-x-auto overflow-y-auto">
//             <table className="min-w-full bg-white divide-y divide-gray-200">
//               <thead>
//                 <tr className="text-left text-gray-500">
//                   <th className="pb-4 w-[19%]">TASK NAME</th>
//                   <th className="pb-4 w-[9%]">
//                     <div className="flex items-center">
//                       DATE
//                       <button onClick={handleSort} className="ml-2">
//                         {sortOrder === "asc" ? (
//                           <ArrowUp className="w-4 h-4" />
//                         ) : (
//                           <ArrowDown className="w-4 h-4" />
//                         )}
//                       </button>
//                     </div>
//                   </th>
//                   <th className="pb-4 w-[38%]">TAGS</th>
//                   <th className="pb-4 w-[16%]">PRICE RANGE</th>
//                   <th className="pb-4 w-[10%]">STATUS</th>
//                   <th className="pb-4 w-[8%]"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tasks.map((task) => (
//                   <tr key={task.id} className="border-t border-gray-200">
//                     <td className="py-4 md:py-4 text-sm md:text-base">
//                       {task.name}
//                     </td>
//                     <td className="py-4 md:py-4 text-sm md:text-base">
//                       {new Date(task.created_at).toLocaleDateString()}
//                     </td>
//                     <td className="py-4 md:py-4">
//                       <div className="flex flex-wrap gap-1">
//                         {task.tags.map((tag, index) => (
//                           <span
//                             key={index}
//                             className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm whitespace-nowrap"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </td>
//                     <td className="py-2 md:py-4 text-sm md:text-base">
//                       ₹{task.lower_price} - ₹{task.higher_price}
//                     </td>
//                     <td className="py-2 md:py-4">
//                       <span
//                         className={`px-1 py-0.5 md:px-2 md:py-1 rounded-md text-xs md:text-sm ${
//                           task.is_completed
//                             ? "bg-gray-200 text-green-800"
//                             : task.is_assigned
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-green-300 text-black"
//                         }`}
//                       >
//                         {task.is_completed
//                           ? "Completed"
//                           : task.is_assigned
//                           ? "Assigned"
//                           : "Open"}
//                       </span>
//                     </td>
//                     <td className="py-2 md:py-4">
//                       <button
//                         className="bg-blue-100 text-blue-800 px-2 py-1 md:px-4 md:py-1 rounded-md text-xs md:text-sm"
//                         onClick={() => handleViewTask(task)}
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="pagination-container fixed bottom-0 w-2/3 bg-white pb-4 pt-2 flex justify-start items-center">
//             <nav className="flex items-center space-x-1 md:space-x-2">
//               <button
//                 className={`px-2 py-1 md:px-3 md:py-1 border rounded-md text-sm md:text-base ${
//                   currentPage === 1
//                     ? "cursor-not-allowed opacity-50"
//                     : "hover:bg-gray-200"
//                 }`}
//                 onClick={() => handlePageClick(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 &lt;
//               </button>
//               {getPageNumbers().map((page, index) => (
//                 <React.Fragment key={index}>
//                   {typeof page === "number" ? (
//                     <button
//                       className={`px-2 py-1 md:px-3 md:py-1 border rounded-md text-sm md:text-base ${
//                         currentPage === page
//                           ? "bg-blue-500 text-white"
//                           : "hover:bg-gray-200"
//                       }`}
//                       onClick={() => handlePageClick(page)}
//                     >
//                       {page}
//                     </button>
//                   ) : (
//                     <span className="px-1 md:px-2">...</span>
//                   )}
//                 </React.Fragment>
//               ))}
//               <button
//                 className={`px-2 py-1 md:px-3 md:py-1 border rounded-md text-sm md:text-base ${
//                   currentPage === totalPages
//                     ? "cursor-not-allowed opacity-50"
//                     : "hover:bg-gray-200"
//                 }`}
//                 onClick={() => handlePageClick(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 &gt;
//               </button>
//             </nav>
//           </div>
//         </>
//       )}

//       {selectedTask && (
//         <TaskDetailsPopup
//           task={selectedTask}
//           onClose={() => setSelectedTask(null)}
//           onDelete={() => handleDeleteTask(selectedTask.id)}
//           onUpdate={() => getTasks(currentPage - 1)}
//         />
//       )}
//     </div>
//   );
// };

// export default TasksContent;

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Filter, ArrowUp, ArrowDown } from "lucide-react";
import { debounce } from "lodash";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import CreateNewTask from "./CreateNewTask";
import TaskDetailsPopup from "./TaskDetailsPopup";

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
    // startDate:"",
    // endDate:""
  });
  const [showFilters, setShowFilters] = useState(false);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [allTags, setAllTags] = useState([]);
  const [tagSearch, setTagSearch] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const filterRef = useRef(null);

  const debouncedGetTasks = useCallback(
    debounce(() => {
      getTasks();
    }, 300),
    []
  );

  useEffect(() => {
    debouncedGetTasks();

    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [debouncedGetTasks]);

  const getTasks = async () => {
    try {
      const response = await axiosInstance.post("tasks/getTasks", {
        size: pageSize,
        page: currentPage,
        lower_price: filters.minPrice,
        higher_price: filters.maxPrice,
        search: searchTerm,
        status: filters.status,
        start_date: filters.startDate,
        end_date: filters.endDate,
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

  const handleSort = async () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    try {
      const response = await axiosInstance.post("tasks/getTasks", {
        size: pageSize,
        page: currentPage,
        lower_price: filters.minPrice,
        higher_price: filters.maxPrice,
        search: searchTerm,
        status: filters.status,
        start_date: filters.startDate,
        end_date: filters.endDate,
        sort: newSortOrder,
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
    if (e.key === "Enter") {
      getTasks();
    }
  };

  const handleSearchClear = () => {
    setSearchTerm("");
    debouncedGetTasks();
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
      minPrice: 0,
      maxPrice: 10000,
      tags: [],
      startDate: "",
      endDate: "",
    });
    setTagSearch("");
    setIsFiltered(false);
    debouncedGetTasks();
    toast.success("Filters cleared");
  };

  const handleApplyFilters = () => {
    setCurrentPage(0);
    setIsFiltered(true);
    getTasks();
    setShowFilters(false);
    toast.success("Filters applied");
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
        toast.success("Task deleted successfully");
      } else {
        console.error("Failed to delete task");
        toast.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error deleting task");
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    getTasks();
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
          onTaskCreated={getTasks}
        />
      ) : (
        <>
          <div className="mb-6 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by task name,tags and description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

          <div className="overflow-x-auto overflow-y-auto">
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
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-t border-gray-200">
                    <td className="py-4 md:py-4 text-sm md:text-base">
                      {task.name}
                    </td>
                    <td className="py-4 md:py-4 text-sm md:text-base">
                      {new Date(task.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 md:py-4">
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
                    <td className="py-2 md:py-4 text-sm md:text-base">
                      ₹{task.lower_price} - ₹{task.higher_price}
                    </td>
                    <td className="py-2 md:py-4">
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
                    <td className="py-2 md:py-4">
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

          <div className="pagination-container fixed bottom-0 w-2/3 bg-white pb-4 pt-2 flex justify-start items-center">
             <nav className="flex items-center space-x-1 md:space-x-2">
               <button
                className={`px-2 py-1 md:px-3 md:py-1 border rounded-md text-sm md:text-base ${
                  currentPage === 1
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {typeof page === "number" ? (
                    <button
                      className={`px-2 py-1 md:px-3 md:py-1 border rounded-md text-sm md:text-base ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => handlePageClick(page)}
                    >
                      {page}
                    </button>
                  ) : (
                    <span className="px-1 md:px-2">...</span>
                  )}
                </React.Fragment>
              ))}
              <button
                className={`px-2 py-1 md:px-3 md:py-1 border rounded-md text-sm md:text-base ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </nav>
          </div>
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
