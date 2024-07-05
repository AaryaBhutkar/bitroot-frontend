import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import PropTypes from "prop-types";

const EvaluatorDetails = ({ evaluatorId, onBack }) => {
  const [evaluator, setEvaluator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvaluatorDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.post("users/completeProfile", {
          is_fetch: 1,
          evaluator_id: evaluatorId
        });
        if (response.data.success) {
          setEvaluator(response.data.data);
        } else {
          setError("Failed to fetch evaluator details");
        }
      } catch (error) {
        setError("An error occurred while fetching evaluator details");
        console.error("Error fetching evaluator details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluatorDetails();
  }, [evaluatorId]);

  if (loading) return null;
  if (error) return null;
  if (!evaluator) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md shadow-md w-1/2 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Evaluator Details</h2>
          <button onClick={onBack} className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 px-3 py-1 rounded-full shadow-md transition-colors duration-200 ease-in-out">
            &times;
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Name:</label>
          <p>{evaluator.name}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Email:</label>
          <p>{evaluator.email}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">LinkedIn:</label>
          <a href={evaluator.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {evaluator.linkedin_url}
          </a>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Years of Experience:</label>
          <p>{evaluator.yoe}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Price Range (₹):</label>
          <p>₹{evaluator.lower_price} - ₹{evaluator.higher_price}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Tags:</label>
          <p>{evaluator.tags}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Contact Info:</label>
          <p>{evaluator.contact}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Task Name:</label>
          <p>{evaluator.task_name}</p>
        </div>
      </div>
    </div>
  );
};

EvaluatorDetails.propTypes = {
  evaluatorId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EvaluatorDetails;