// import React, { useState } from 'react';

// const Sidebar = ({ setActivePage }) => {
//   const [activeItem, setActiveItem] = useState('createTask');

//   const menuItems = [
//     { name: 'Create Task', id: 'createTask' },
//     { name: 'Requests', id: 'requests' },
//     { name: 'Approved', id: 'approved' },
//     { name: 'Analytics', id: 'analytics' },
//   ];

//   const handleItemClick = (id) => {
//     setActiveItem(id);
//     setActivePage(id);
//   };

//   return (
//     <div className="bg-blue-100 w-1/4 h-screen p-6">
//       <div className="flex items-center mb-8">
//         <img src="logo.svg" alt="Bitroot Logo" className="w-40 h-30" />

//       </div>
//       <ul>
//         {menuItems.map(item => (
//           <li
//             key={item.id}
//             className={`p-2 my-2 cursor-pointer rounded ${activeItem === item.id ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
//             onClick={() => handleItemClick(item.id)}
//           >
//             {item.name}
//           </li>
//         ))}
//       </ul>
//       <div className="absolute bottom-6 left-6">
//         <button className="text-blue-500">Logout</button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React from 'react';

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="w-64 bg-blue-50 p-4">
      <div className="mb-8">
        <img src="/logo.png" alt="Bitroot" className="h-10 mb-4" />
        <p className="text-2xl font-bold">Bitroot</p>
      </div>
      <nav>
        <button onClick={() => setActivePage('createTask')} className="block mb-4 text-left w-full p-2 rounded hover:bg-blue-100">
          CREATE TASK
        </button>
        <button onClick={() => setActivePage('requests')} className="block mb-4 text-left w-full p-2 rounded hover:bg-blue-100">
          REQUESTS
        </button>
        <button onClick={() => setActivePage('approved')} className="block mb-4 text-left w-full p-2 rounded hover:bg-blue-100">
          APPROVED
        </button>
        <button onClick={() => setActivePage('analytics')} className="block mb-4 text-left w-full p-2 rounded hover:bg-blue-100">
          ANALYTICS
        </button>
      </nav>
      <button className="mt-8 w-full text-left p-2 rounded hover:bg-blue-100">
        LOGOUT
      </button>
    </div>
  );
};

export default Sidebar;
