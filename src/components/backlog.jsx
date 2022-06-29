import React, {useEffect} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { serviceRequestSelector, requestModal, selectedService } from '../atom_selector/recoil.js';
import './comp-styling/backlog.css';
import RequestFormModal from './modal/requestFormModal.js';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';


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
            <div key={i} className="service-request-container" onClick={() => {onServiceEdit(service)}}>
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


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'serviceon', headerName: 'Weekday', width: 130 },
    { field: 'location', headerName: 'Location', width: 130 },
    {
      field: 'contact',
      headerName: 'POC',
      // type: 'number',
      width: 90,
    },
    {
      field: 'phone_number',
      headerName: 'Phone #',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      // valueGetter: (params) =>
        // `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  const rows = backLog.filterLog;
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];


  return (
    <div className="backlog">
       <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
      <RequestFormModal/>
      {checkAvailability()}
    </div>
  );
};

export default Backlog;