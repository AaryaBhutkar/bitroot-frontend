import React from 'react';
// import Sidebar from './Sidebar';

const MainContent = () => (
  <main className="flex-grow p-8">
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">HELLO, ADMIN</h1>
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Search" className="border rounded-md px-3 py-1" />
        <button className="text-blue-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </button>
        <button className="text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </button>
      </div>
    </header>
    <form className="space-y-4">
      <div>
        <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name:</label>
        <input type="text" id="projectName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>
      <div>
        <label htmlFor="brief" className="block text-sm font-medium text-gray-700">Brief:</label>
        <textarea id="brief" rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Placeholder"></textarea>
      </div>
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags:</label>
        <input type="text" id="tags" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Placeholder" />
      </div>
      <div>
        <label htmlFor="gitLinks" className="block text-sm font-medium text-gray-700">Git Links:</label>
        <input type="text" id="gitLinks" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Placeholder" />
      </div>
      <div>
        <label htmlFor="guidelines" className="block text-sm font-medium text-gray-700">Guidelines:</label>
        <textarea id="guidelines" rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Placeholder"></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price Range:</label>
        <div className="flex items-center space-x-2 mt-1">
          <input type="text" className="block w-1/2 border border-gray-300 rounded-md shadow-sm p-2" placeholder="Placeholder" />
          <span>TO</span>
          <input type="text" className="block w-1/2 border border-gray-300 rounded-md shadow-sm p-2" placeholder="Placeholder" />
        </div>
      </div>
      <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded">Submit</button>
    </form>
  </main>
);

// const Layout = () => (
//   <div className="flex h-screen bg-gray-100">
//     <Sidebar />
//     <MainContent />
//   </div>
// );

export default MainContent;