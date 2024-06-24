import React, { useState } from 'react';

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState('TASKS');

  const buttons = [
    { name: 'TASKS', icon: '✏️' },
    { name: 'COMPLETED', icon: '🔒' },
    { name: 'EXISTING', icon: '📚' },
  ];

  return (
    <aside className="w-64 bg-blue-50 h-screen p-4 flex flex-col">
      <div className="mb-8">
        <img src="logo.svg" alt="Bitroot" className="h-8" />
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {buttons.map((button) => (
            <li key={button.name}>
              <button
                className={`w-full flex items-center space-x-2 p-2 rounded transition-colors ${
                  activeButton === button.name
                    ? 'bg-white text-blue-600'
                    : 'hover:bg-white/50'
                }`}
                onClick={() => setActiveButton(button.name)}
              >
                <span>{button.icon}</span>
                <span>{button.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
          <span>LOGOUT</span>
          <span>↪️</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;