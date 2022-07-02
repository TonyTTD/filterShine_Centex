import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { requestModal, selectedService, selectedServiceSelector } from '../../atom_selector/recoil.js';
import './modal.css';
import moment from 'moment';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

var RequestFormModal = () => {
  let [useRequestModal, setRequestModal] = useRecoilState(requestModal);
  let selectedLog = useRecoilValue(selectedService);
  let filtersUsed = useRecoilValue(selectedServiceSelector);
  let [updateServiceDate, setServiceDate] = useState(null);
  let [updateCycle, setCycle] = useState(null);

  const onSubmit = (e) => {
    if (updateServiceDate && updateCycle) {
      axios.all(
        [
          axios.put('http://localhost:4004/filtershine/api/client/update/serviceon', {
            newDate: updateServiceDate,
            clientId: selectedLog.id
          }),
          axios.put('http://localhost:4004/filtershine/api/client/update/cycle', {
            newCycle: updateCycle,
            clientId: selectedLog.id
          })
        ])
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)});
    } else if (updateServiceDate) {
      axios.put('http://localhost:4004/filtershine/api/client/update/serviceon', {
        newDate: updateServiceDate,
        clientId: selectedLog.id
      })
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)});
    } else if (updateCycle) {
      axios.put('http://localhost:4004/filtershine/api/client/update/cycle', {
        newCycle: updateCycle,
        clientId: selectedLog.id
      })
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)});
    }
    setCycle(null);
    setServiceDate(null);
    setRequestModal(false);
  };

  const handleServiceDate = (date) => {
    setServiceDate(date);
  };

  const handleCycle = (cycle) => {
    setCycle(parseInt(cycle));
  };

  const onCancel = () => {
    setCycle(null);
    setServiceDate(null);
    setRequestModal(false);
  };

  if(useRequestModal === true) {
    return (
      <div className="modal">
        <div className="modal-content">
            <div className="modal-body"><h2>Edit Service Log</h2>
              <div className="modal-company-info">
                <div className="modal-company">{selectedLog.company}</div>
                <div className="modal-address">{selectedLog.address}</div>
                <div className="modal-city-st-zip">{selectedLog.city}, {selectedLog.st}, {selectedLog.zip}</div>
                <div className="modal-phone-num">{selectedLog.phone_number}</div>
                <div className="modal-poc">{selectedLog.title}: {selectedLog.contact}</div>
                <div className="modal-poc-num">{selectedLog.poc_number}</div>
                <div className="modal-email">{selectedLog.email}</div>
              </div>
              <div className="modal-edits"><h3>Update Service Date / Cycle</h3>
                <label>Every {moment(selectedLog.serviceon).format('dddd')}</label>
                <label>Service Started On: {moment(selectedLog.serviceon).format('MM-DD-YYYY')}</label>
                  <input id="calendar-select-from" type="date" onChange={(e) => {handleServiceDate(e.target.value)}}></input>
                  <TextField
                    id="outlined-filter-update"
                    label={`Current cycle: ${selectedLog.cycle}`}
                    onChange={(e) => {handleCycle(e.target.value)}}
                    size="small"
                    style={{margin:"1ch"}}
                  >
                  </TextField>
              </div>
              <div className="modal-filters">Required Filters
                {filtersUsed.map((filter,i) => {
                  return (
                    <div key={i}>{filter.type}: {filter.installed}
                    </div>
                  )
                })}
              </div>
              <div className="modal-buttons">
                <Stack direction="column" spacing={2} margin={5}>
                  <Button variant="contained" onClick={(e) => {onSubmit(e.target.value)}}>Update</Button>
                  <Button variant="contained" onClick={() => onCancel()}>Cancel</Button>
                </Stack>
              </div>
            </div>
        </div>
      </div>
    );
  }
};

export default RequestFormModal;