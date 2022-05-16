import React, {useEffect} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { serviceRequestSelector, requestModal, selectedService } from '../atom_selector/recoil.js';
import './comp-styling/backlog.css';
import RequestFormModal from './modal/requestFormModal.js';
import moment from 'moment';

var Backlog = () => {
  let backLog = useRecoilValue(serviceRequestSelector);
  let [useRequestModal, setRequestModal] = useRecoilState(requestModal);
  let [useSelectedService, setSelectedService] = useRecoilState(selectedService);

  const onServiceEdit = (e) => {
    setSelectedService(e);
    setRequestModal(true);
  }

  const checkAvailability = () => {
    if (backLog.filterLog.length === 0) {
      return (
        <div className="service-request-container">No Available Services Are Required on Specified Date</div>
      )
    } else {
      return (
        backLog.filterLog.map((service, i) => {
          return (
            <div key={i} className="service-request-container" onClick={(event) => {onServiceEdit(service)}}>
              <div className="service-request">
                <span className="service-day">{moment(service.serviceon).format('dddd')}</span>
                <span className="service-id">ID: {service.id}</span>
                <span className="service-location">{service.location}</span>
                <span className="service-poc">POC: {service.contact}</span>
                <span className="service-phone">Phone#: {service.phone_number}</span>
              </div>
              {/* <div className="service-request-desc">
                <span>{service.company}</span>
                <span>{service.company}</span>
                <span>
                <button className="service-request-edit">Edit</button>
              </span>
              </div> */}
            </div>
          )
        })
      )
    }
  }

  return (
    <div className="backlog">

      <RequestFormModal/>
      {checkAvailability()}
    </div>
  );
};

export default Backlog;