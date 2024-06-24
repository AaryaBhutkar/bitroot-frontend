import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const EvaluatorDashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default EvaluatorDashboard;