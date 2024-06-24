import React from 'react';

const EvaluatorDetails = ({ evaluator, onBack }) => {
  return (
    <div>
      <button onClick={onBack} className="mb-4 text-blue-500">Back</button>
      <h2 className="text-xl font-bold mb-4">Evaluator Details</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <p>{evaluator.name}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">LinkedIn:</label>
        <p><a href={evaluator.linkedin} className="text-blue-500">{evaluator.linkedin}</a></p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Years of Experience:</label>
        <p>{evaluator.experience}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price Quotation:</label>
        <p>{evaluator.price}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tags:</label>
        <p>{evaluator.tags.join(', ')}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Contact Info:</label>
        <p>{evaluator.contact}</p>
      </div>
    </div>
  );
};

export default EvaluatorDetails;
