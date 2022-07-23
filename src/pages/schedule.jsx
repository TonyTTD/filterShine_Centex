import React from 'react';

const Backlog = React.lazy(() => import('../components/backlog.jsx'));
const Calendar = React.lazy(() => import('../components/calendar.jsx'));
const InventoryCount = React.lazy(() => import('../components/inventoryCount.jsx'));

const Schedule = () => {
  return (
    <div className="comp-container">
      <Calendar/>
      <InventoryCount/>
      <Backlog/>
    </div>
  )
};

export default Schedule;