import React from 'react';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { selectedDate, enableDateRange } from '../atom_selector/recoil.js';
import './comp-styling/calendar.css';

var Calendar = () => {

  let [selectDate, setSelectedDate] = useRecoilState(selectedDate);
  let [isDateRange, setEnableRange] = useRecoilState(enableDateRange);

  const onDateSelect = (e) => {
    let fromDate = document.getElementById("calendar-select-from").value || selectDate[0];
    let toDate = document.getElementById("calendar-select-to").value;
    // console.log('date',fromDate === "", 'to', toDate);
    !isDateRange ? setSelectedDate([moment(fromDate).format('MM-DD-YYYY'), ""]) : setSelectedDate([moment(fromDate).format('MM-DD-YYYY'), moment(toDate).format('MM-DD-YYYY')]);
  };

  const defaultDateRange = () => {
    if (!selectDate[1]) {
      return `Today is: ${selectDate[0]}`;
    } else {
      return `${selectDate[0]} to ${selectDate[1]}`;
    }
  };

  const enableToDate = (e) => {
    let toDateAttribute = document.getElementById("calendar-select-to")
    if (toDateAttribute.hasAttribute('hidden')) {
      toDateAttribute.removeAttribute('hidden');
      setEnableRange(true);
    } else {
      toDateAttribute.setAttribute('hidden', !isDateRange);
      setEnableRange(false);
    }
  };

  return (
    <>
      <div className="calendar-container">{defaultDateRange()} <br></br>
        <input id="calendar-select-from" type="date"></input>
        {/* <input className="from-date-select" type="submit" onClick={(event) => {onDateSelect(event)}}></input> */}
        <input id="calendar-select-to" type="date" hidden></input><br></br>
        <button className="date-select" onClick={(event) => {onDateSelect(event)}}>Search</button>
      </div>
      <input type="checkbox" value="Range-enabled" onClick={(e) => enableToDate(e)}></input>
      <span>Enable Range</span>
    </>
  );
};

export default Calendar;