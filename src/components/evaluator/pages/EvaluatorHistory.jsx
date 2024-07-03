import React from 'react';

const HistoryItem = ({ content }) => (
  <div className="mb-2 p-4 bg-blue-100 rounded-lg text-sm">
    {content}
  </div>
);

const EvaluatorHistory = () => {
  const historyItems = [
    "Evaluator A has been assigned Frontend Developer.",
    "Evaluator A has been denied the task for Flutter",
    "Evaluator A has been assigned Backend Developer."
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">HISTORY</h2>
      <div>
        {historyItems.map((item, index) => (
          <HistoryItem key={index} content={item} />
        ))}
      </div>
    </div>
  );
};

export default EvaluatorHistory;