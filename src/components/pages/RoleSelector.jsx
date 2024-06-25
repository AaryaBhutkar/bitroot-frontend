import React from 'react';
import { Link } from 'react-router-dom';

const RoleSelector = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        ARE YOU A EVALUATOR OR ADMIN ?
      </h1>
      <div className="flex justify-between gap-4">
        <Link to="/profile" className="flex-1 py-2 px-4 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-50 transition-colors">
          EVALUATOR
        </Link>
        <Link  to="/adminDashboard" className="flex-1 py-2 px-4 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-50 transition-colors">
          ADMIN
        </Link>
      </div>
    </div>
  );
};

export default RoleSelector;