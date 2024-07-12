import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    contact: "",
    linkedin_url: "",
    yoe: "",
    tags: [],
  });
  const [errors, setErrors] = useState({});
  const [availableTags, setAvailableTags] = useState([
    { id: 1, name: "Frontend Developer" },
    { id: 2, name: "Backend Developer" },
    { id: 3, name: "Flutter" },
  ]);
  const [newTag, setNewTag] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const handleTagToggle = (tagId) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  const handleAddNewTag = () => {
    if (newTag.trim() !== "" && formData.tags.length < 5) {
      const newTagObject = {
        id: availableTags.length + 1,
        name: newTag.trim(),
      };
      setAvailableTags([...availableTags, newTagObject]);
      setNewTag("");
      handleTagToggle(newTagObject.id);
    }
  };

  const handleTagRemove = (tagId) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((id) => id !== tagId),
    }));
    setAvailableTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };
  // const handleAddNewTag = () => {
  //   if (newTag.trim() !== "") {
  //     const newTagObject = {
  //       id: availableTags.length + 1,
  //       name: newTag.trim(),
  //     };
  //     setAvailableTags([...availableTags, newTagObject]);
  //     setNewTag("");
  //     handleTagToggle(newTagObject.id);
  //   }
  // };

  const selectedTags = formData.tags.map((tagId) => {
    const tag = availableTags.find((tag) => tag.id === tagId);
    return tag ? tag.name : "";
  });

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (formData.yoe === "" || isNaN(formData.yoe)) {
      newErrors.yoe = "Years of Experience is required and must be a number.";
      isValid = false;
    } else {
      const yoeValue = parseInt(formData.yoe, 10);
      if (yoeValue < 0 || yoeValue > 50) {
        newErrors.yoe = "Years of Experience must be between 0 and 50.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axiosInstance.post("users/completeProfile", {
        user_id: localStorage.getItem("user"), // You need to implement this function
        ...formData,
        yoe: parseInt(formData.yoe, 10),
        tags: selectedTags,
        is_fetch: 0,
      });

      const data = await response.data;

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
            <label
              htmlFor="contact"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Contact Number:
            </label>
            <input
              type="text"
              id="contact"
              value={formData.contact}
              onChange={handleInputChange}
              maxLength={10}
              pattern="[0-9]{10}"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="linkedin_url"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="yoe"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Years of Experience:
            </label>
            <input
              type="number"
              id="yoe"
              value={formData.yoe}
              onChange={handleInputChange}
              min="0"
              max="50"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.yoe && (
              <p className="mt-1 text-sm text-red-600">{errors.yoe}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tags:
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {availableTags.map((tag) => (
                <span
                  key={tag.id}
                  onClick={() => handleTagToggle(tag.id)}
                  className={`px-3 py-1 text-sm rounded-full cursor-pointer ${
                    formData.tags.includes(tag.id)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {tag.name}
                  {formData.tags.includes(tag.id) && (
                    <span
                      className="ml-1 text-xs text-red-600 cursor-pointer"
                      onClick={() => handleTagRemove(tag.id)}
                    >
                      ×
                    </span>
                  )}
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a new tag"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddNewTag}
                className="px-4 py-2 text-white bg-blue-500 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add
              </button>
              <span className="ml-2 text-sm text-gray-600">
                {formData.tags.length} / 5 tags added
              </span>
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
