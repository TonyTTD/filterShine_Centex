import * as React from 'react';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { selectedDate, enableDateRange } from '../atom_selector/recoil.js';
import './comp-styling/calendar.css';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

var Calendar = () => {

  let [selectDate, setSelectedDate] = useRecoilState(selectedDate);
  let [isDateRange, setEnableRange] = useRecoilState(enableDateRange);

  const onDateSelect = (e) => {
    let fromDate = document.getElementById("calendar-select-from").value || selectDate[0];
    let toDate = document.getElementById("calendar-select-to").value;

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
    <div className="calendar">
      {defaultDateRange()}
      <input id="calendar-select-from" type="date"></input>
      <input id="calendar-select-to" type="date" hidden></input><br></br>
      <Button variant="contained" size="small" onClick={(event) => {onDateSelect(event)}}>
        Search
      </Button>
      <FormGroup>
        <FormControlLabel control={<Checkbox onClick={(e) => enableToDate(e)}/>} label="Enable Range" />
      </FormGroup>
    </div>
  );
};

export default Calendar;

