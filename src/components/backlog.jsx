import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { serviceRequestSelector } from '../atom_selector/recoil.js';
import './comp-styling/backlog.css';
import RequestFormModal from './modal/requestFormModal.js';
import moment from 'moment';

var Backlog = () => {
  console.log(moment('06/10/22').format('dddd'));
  let backLog = useRecoilValue(serviceRequestSelector);

  const onServiceEdit = (e) => {
    console.log(e);
  }

  return (
    <div className="backlog">
      <div className="backlog-title">Service Logs</div>
      <RequestFormModal/>
      {backLog.filterLog.map((service, i) => {
        return (
          <div key={i} className="service-request-container" onClick={(event) => {onServiceEdit(event)}}>
            <div className="service-request">
              <span className="service-day">{moment(service.serviceOn).format('dddd')} |</span>
              <span className="service-id">ID: {service.service_id}</span>
              <span className="service-location">Company: {service.company}</span>
              <span className="service-poc">POC: {service.poc}</span>
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
      })}
    </div>
  );
};

export default Backlog;