import React from 'react';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { selectedDate } from '../atom_selector/recoil.js';
import './comp-styling/calendar.css';

var Calendar = () => {

  // const weekdayshort = moment.weekdaysShort();
  let [selectDate, setSelectedDate] = useRecoilState(selectedDate);

  const onDateSelect = (e) => {
    let x = document.getElementById("calendar-select").value;
    setSelectedDate(moment(x).format('MM-DD-YYYY'));
  };

  return (
    <div>On: {selectDate} <br></br>
      <input id="calendar-select" type="date"></input>
      <input className="date-select" type="submit" onClick={(event) => {onDateSelect(event)}}></input>
    </div>
    // weekdayshort.map(day => {
    //   return (
    //     // <th key={day} className="week-day">
    //     //   {day}
    //     // </th>

    //   )
    // })
  );
};

export default Calendar;