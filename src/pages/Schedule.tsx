import React from "react";

const Backlog = React.lazy(() => import("../components/Backlog.js"));
const Calendar = React.lazy(() => import("../components/Calendar.js"));
const InventoryCount = React.lazy(
  () => import("../components/InventoryCount.js")
);

const Schedule = () => {
  return (
    <div className="comp-container">
      <Calendar />
      <InventoryCount />
      <Backlog />
    </div>
  );
};

export default Schedule;
