import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { serviceRequestSelector, requestModal, selectedService } from '../atom_selector/recoil.js';
import './comp-styling/backlog.css';
import RequestFormModal from './modal/requestFormModal.js';
import moment from 'moment';

import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

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

  const sortLogsByDate = (logs) => {
    let copied = logs.slice();
    return copied.sort((a, b) => {
      return moment(a.serviceon).format('ddd') - moment(b.serviceon).format('ddd')});
  };

  return (
    <>
      <div className="backlog">
        <div style={{ height: "700px", width: '100%' }}>
          <DataGrid
            style={{height: "50%"}}
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

      </div>
      <RequestFormModal/>
      {/* The alternate display of this component is based on screen width */}
      <Grid className="alt-backlog" item xs={12} md={6}>
        <List>
          {sortLogsByDate(rows).map((filter) => {
            return (
            <ListItem key={filter.id} onClick={(e) => {onServiceEdit(filter.id)}}>
              <ListItemAvatar>
                <Avatar>
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                  <Typography variant="caption" component="div" color="text.secondary">
                    {`${moment(filter.serviceon).format('ddd')}`}
                  </Typography>
                  </Box>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${filter.location}`}
                secondary={`${filter.contact} #:${filter.phone_number}`}
              />
            </ListItem>
          )})}
        </List>
      </Grid>
    </>
  );
};

export default Backlog;