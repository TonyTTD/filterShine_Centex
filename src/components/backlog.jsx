import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { serviceRequestSelector } from '../atom_selector/recoil.js';
import './comp-styling/backlog.css';
import RequestFormModal from './modal/requestFormModal.js';
import moment from 'moment';

var Backlog = () => {

 let backLog = useRecoilValue(serviceRequestSelector);

  return (
    <div className="backlog">
      <div>
      <RequestFormModal/>
      </div>
      {backLog.filterLog.map((service, i) => {
        return (
          <>
            <div key={i} className="service-request">
              <span className="service-id">SI: {service.service_id}</span>
              <span className="service-location">Company: {service.company}</span>
              <span className="service-poc">POC: {service.poc}</span>
              <span className="service-phone">Phone#: {service.phone_number}</span>
            </div>
            <div className="service-request-desc">
              <span>{service.company}</span>
              <span>{service.company}</span>
            </div>
            <span>
              <button className="service-request-edit">Edit</button>
            </span>
          </>
        )
      })}
    </div>
  );
};

export default Backlog;