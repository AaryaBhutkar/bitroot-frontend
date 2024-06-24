import React from 'react';

const MainContent = ({ activePage }) => {
  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold">HELLO, ADMIN</h2>
        <input
          type="text"
          placeholder="Search"
          className="border p-2 rounded w-1/3"
        />
      </div>
      {activePage === 'createTask' && (
        <div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Project Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter project name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Brief:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Placeholder"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tags:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Placeholder"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Git Links:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Placeholder"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Guidelines:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Placeholder"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price Range:</label>
              <div className="flex items-center">
                <input
                  type="text"
                  className="w-1/2 p-2 border rounded mr-2"
                  placeholder="Placeholder"
                />
                <span className="mx-2">TO</span>
                <input
                  type="text"
                  className="w-1/2 p-2 border rounded"
                  placeholder="Placeholder"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {activePage === 'requests' && <div>Requests Page Content</div>}
      {activePage === 'approved' && <div>Approved Page Content</div>}
      {activePage === 'analytics' && <div>Analytics Page Content</div>}
    </div>
  );
};

export default MainContent;
