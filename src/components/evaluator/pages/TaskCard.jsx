import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import { ClipboardList, Clock } from "lucide-react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const TaskCard = ({
  task_id,
  title,
  description,
  tags,
  onTaskInterest,
  createdAt,
  interestCount
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const getPostedTime = (createdAt) => {
    const now = dayjs();
    const createdTime = dayjs(createdAt);
    const diff = dayjs.duration(now.diff(createdTime));

    const years = Math.floor(diff.asYears());
    const months = Math.floor(diff.asMonths() % 12);
    const days = Math.floor(diff.asDays() % 30);
    const hours = diff.hours();

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ${months} month${
        months > 1 ? "s" : ""
      } ago`;
    }

    if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ${days} day${
        days > 1 ? "s" : ""
      } ago`;
    }

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ${hours} hour${
        hours > 1 ? "s" : ""
      } ago`;
    }

    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  };

  const handleInterestClick = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("tasks/assignTask", {
        task_id: task_id,
        evaluator_id: localStorage.getItem("user"),
        is_interest: 1,
      });
      const result = response.data;
      if (result.success) {
        window.dataLayer.push({'event':'I\'m interested'});
        toast.success("Interest Notified!");
        onTaskInterest(task_id);
      } else {
        toast.error("Failed to assign task: " + result.message);
      }
    } catch (error) {
      toast.error("Error assigning task: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!task_id) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <ClipboardList className="w-16 h-16 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-700">
            No Tasks Available
          </h3>
          <p className="text-gray-600">
            There are currently no tasks or recent projects to display.
          </p>
          <p className="text-gray-500">
            Check back later for new opportunities!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 mb-1">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {getPostedTime(createdAt)}
        </span>
        <span className="text-lg text-gray-500 flex items-center ml-4">
          Applicants: <span className="text-lg  text-green-600 ml-1">{interestCount}</span>
        </span>
        <button
          onClick={handleInterestClick}
          disabled={isLoading}
          className={`px-4 py-2 rounded font-medium ${
            isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } transition-colors duration-300`}
        >
          {isLoading ? "Processing..." : "I'm interested"}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
