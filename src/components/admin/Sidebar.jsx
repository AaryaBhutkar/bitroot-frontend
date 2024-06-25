import { Link } from 'react-router-dom';
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
      <Link to="/login" className="mt-8 w-full text-left p-2 rounded hover:bg-blue-100">
        LOGOUT
      </Link>
    </div>
  );
};

export default Sidebar;
