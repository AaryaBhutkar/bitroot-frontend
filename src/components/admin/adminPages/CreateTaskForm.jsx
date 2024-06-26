import React from "react";

const CreateTaskForm = () => {
  return (
    <div className="p-4 border rounded shadow-md bg-white">
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
  );
};

export default CreateTaskForm;
