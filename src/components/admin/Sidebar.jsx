import { Link } from 'react-router-dom';
import React from 'react';

const Sidebar = ({ setActivePage }) => {
  return (
    
    <div className="w-64 bg-blue-200 p-4 flex flex-col justify-between min-h-screen">
      <div>
        <div className="mb-8 border-b-2 border-black">
          <img src="/logo.png" alt="Bitroot" className="h-10 mb-4" />
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
      </div>
      <Link to="/login" className="mt-auto w-full text-left p-2 rounded hover:bg-blue-100">
        LOGOUT
      </Link>
    </div>
  );
};

export default Sidebar;
