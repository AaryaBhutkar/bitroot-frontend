// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import Request from './Request';

// const EvaluatorDashboard = () => {
//   const [activePage, setActivePage] = useState('createTask');

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar setActivePage={setActivePage} />
//       <Request activePage={activePage} />
//     </div>
//   );
// };

// export default EvaluatorDashboard;


import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Request from './Request';

const EvaluatorDashboard = () => {
  const [activePage, setActivePage] = useState('createTask');

  return (
    <div className="flex min-h-screen">
      <Sidebar setActivePage={setActivePage} />
      <Request activePage={activePage} />
    </div>
  );
};

export default EvaluatorDashboard;
