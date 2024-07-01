import React, {useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const EvaluatorDashboard = () => {
  const [activePage, setActivePage] = useState("tasks");

  // useEffect(()=>{
  //   const verifyToken = async () => {
  //     try {
  //       const token = localStorage.getItem("token"); 
  //       const response = await fetch('http://localhost:3001/api/users/verifyToken', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ token }),
  //       });

  //       if (response.ok) {
  //         console.log('Token verified:', response);
  //       } else {
  //         console.error('Token verification failed:', response.status, response);
  //       }
  //     } catch (error) {
  //       console.error('Error verifying token:', error);
  //     }
  //   };

  //   verifyToken();

  // })

  const handleSidebarClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="flex ">
      <Sidebar onSidebarClick={handleSidebarClick} />
      <MainContent activePage={activePage} />
    </div>
  );
};

export default EvaluatorDashboard;
