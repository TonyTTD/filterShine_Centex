import React from 'react';

const Backlog = React.lazy(() => import('../components/backlog.jsx'));
const Calendar = React.lazy(() => import('../components/calendar.jsx'));
const InventoryCount = React.lazy(() => import('../components/inventoryCount.jsx'));

const Schedule = () => {
  return (
    <div className="comp-container">
      <div className="calendar">
        <h2>At a Glance</h2>
        <Calendar/>
      </div>
      <Backlog/>
      <InventoryCount/>
    </div>
  )
};

export default Schedule;