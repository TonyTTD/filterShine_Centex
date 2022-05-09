import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { requestModal, selectedService, selectedServiceSelector } from '../../atom_selector/recoil.js';
import './modal.css';
import moment from 'moment';

var RequestFormModal = () => {
  let [useRequestModal, setRequestModal] = useRecoilState(requestModal);
  let selectedLog = useRecoilValue(selectedService);
  let filtersUsed = useRecoilValue(selectedServiceSelector);

  const onSubmit = () => {
    setRequestModal(false);
  }

  const onCancel = () => {
    setRequestModal(false);
  }

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
              <div className="modal-edits"><h3>Update Cycle</h3>
                <label>Every {moment(selectedLog.serviceon).format('dddd')}</label>
                <label>Service Started On:</label>
                  <input type="text" className="modal-weekday" placeholder={moment(selectedLog.serviceon).format('MM-DD-YYYY')}></input>
                <label>Cycle:</label>
                  <input type="text" className="modal-route" placeholder={selectedLog.cycle}></input>
              </div>
              <div className="modal-buttons">
                <button className="modal-submit" onClick={onSubmit}>Update</button>
                <button className="modal-cancel" onClick={onSubmit}>Cancel</button>
              </div>
              <div className="modal-filters">Required Filters
                {filtersUsed.map((filter,i) => {
                  return (
                    <div key={i}>{filter.type}: {filter.installed}
                    </div>
                  )
                })}
              </div>
            </div>
        </div>
      </div>
    );
  }
};

export default RequestFormModal;