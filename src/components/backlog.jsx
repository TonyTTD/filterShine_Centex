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

  const onServiceEdit = (id) => {
    for (let i = 0; i < backLog.filterLog.length; i ++) {
      if (backLog.filterLog[i].id === id) {
        setSelectedService(backLog.filterLog[i]);
        break;
      }
    }
    // setSelectedService(e);
    setRequestModal(true);
  }

  // const checkAvailability = () => {
  //   if (backLog.filterLog.length === 0) {
  //     return (
  //       <div className="service-request-container">No Available Services Are Required on Specified Date</div>
  //     )
  //   } else {
  //     return (
  //       backLog.filterLog.map((service, i) => {
  //         return (
  //           <div key={i} className="service-request-container" onClick={() => {onServiceEdit(service)}}>
  //             <div className="service-request">
  //               <span className="service-day">{moment(service.serviceon).format('dddd')}</span>
  //               <span className="service-id">ID: {service.id}</span>
  //               <span className="service-location">{service.location}</span>
  //               <span className="service-poc">POC: {service.contact}</span>
  //               <span className="service-phone">Phone#: {service.phone_number}</span>
  //             </div>
  //           </div>
  //         )
  //       })
  //     )
  //   }
  // }


  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70 },
    {
      field: 'serviceon',
      headerName: 'Service Date',
      width: 175,
      valueGetter: (param) => `${moment(param.row.serviceon).format('dddd')} ${moment(param.row.serviceon).format('MM-DD-YY')}` },
    {
      field: 'location',
      headerName: 'Location',
      width: 130,
      sortable: false,
    },
    {
      field: 'contact',
      headerName: 'POC',
      sortable: false,
      // type: 'number',
      width: 90,
    },
    {
      field: 'phone_number',
      headerName: 'Phone #',
      sortable: false,
      width: 160,
    },
  ];

  const rows = backLog.filterLog;

  return (
    <div className="backlog" width="500">
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          className={'service-request-container'}
          onRowClick={(params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement>>) => {
            event.defaultMuiPrevent = true;
            onServiceEdit(params.id);
          }}
        />
      </div>
      <RequestFormModal/>
      {/* {checkAvailability()} */}
    </div>
  );
};

export default Backlog;