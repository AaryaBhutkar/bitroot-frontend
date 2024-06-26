import React from "react";

const ProfileInfo = () => {
  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Profile Information</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <p className="p-2 border rounded">John Doe</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <p className="p-2 border rounded">johndoe@example.com</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Role:</label>
        <p className="p-2 border rounded">Admin</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
