import React from 'react';
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
    setRequestModal(true);
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70
    },
    {
      field: 'serviceon',
      headerName: 'Service Day / Start',
      width: 175,
      valueGetter: (param) => `${moment(param.row.serviceon).format('dddd')} / ${moment(param.row.serviceon).format('MM-DD-YY')}`
    },
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
    <div className="backlog">
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          className={'service-request-container'}
          onRowClick={(params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement>>) => {
            event.defaultMuiPrevent = true;
            onServiceEdit(params.id);
          }}
        />
      </div>
      <RequestFormModal/>
    </div>
  );
};

export default Backlog;