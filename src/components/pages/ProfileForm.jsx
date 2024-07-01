import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    contact: "",
    linkedin_url: "",
    yoe: "",
    tags: [],
  });
  const [availableTags, setAvailableTags] = useState([
    { id: 1, name: "Frontend Developer" },
    { id: 2, name: "Backend Developer" },
    { id: 3, name: "Flutter" },
  ]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleTagToggle = (tagId) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  const selectedTags = formData.tags.map((tagId) => {
    const tag = availableTags.find((tag) => tag.id === tagId);
    return tag ? tag.name : "";
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/users/completeProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user"), // You need to implement this function
          ...formData,
          yoe: parseInt(formData.yoe, 10),
          tags: selectedTags,
          is_fetch: 0,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/evaluatorDashboard");
      } else {
        console.error("Form submission failed:", data.msg);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-700">
              Contact:
            </label>
            <input
              type="text"
              id="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="linkedin_url" className="block mb-2 text-sm font-medium text-gray-700">
              LinkedIn:
            </label>
            <input
              type="text"
              id="linkedin_url"
              value={formData.linkedin_url}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="yoe" className="block mb-2 text-sm font-medium text-gray-700">
              Years of Experience:
            </label>
            <input
              type="number"
              id="yoe"
              value={formData.yoe}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tags:
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <span
                  key={tag.id}
                  onClick={() => handleTagToggle(tag.id)}
                  className={`px-3 py-1 text-sm rounded-full cursor-pointer ${
                    formData.tags.includes(tag.id) ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;