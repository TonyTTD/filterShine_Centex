import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { requestModal, getAllFilterInfo } from '../atom_selector/recoil.js';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
// import Box from '@mui/material/Box';
import InventoryFormModal from '../components/modal/currentInventoryModal.js';
import AlertDialog from '../components/modal/confirmationModal.js';


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


const Inventory = () => {
  let [filters, setFilters] = useRecoilState(getAllFilterInfo);
  let [useRequestModal, setRequestModal] = useRecoilState(requestModal);
  let [selectFilter, setSelectFilter] = useState({});
  const [updateFilterCount, setUpdateFilterCount] = useState({});


  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  useEffect(() => {
    axios.get('http://localhost:4004/filtershine/api/filter/')
    .then(data => {setFilters(data.data);})
    .catch(err => {throw err;});
  }, []);

  const onInventoryEdit = (filterInfo) => {
    if (!filterInfo.row) {
      setSelectFilter({row: filterInfo});
      setRequestModal(true);
      return;
    }
    setSelectFilter(filterInfo);
    setRequestModal(true);
  };

  const getUpdatedFilterCount = (filterInfo) => {
    setUpdateFilterCount(filterInfo);
  };

  const sendRequest = () => {
    axios.put('http://localhost:4004/filtershine/api/filter', updateFilterCount)
    .then(data => {console.log(data);})
    .catch(err => {throw err});
  };

  const rows = filters;
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
    {
      field: 'type',
      headerName: 'Filter Type',
      width: 100,
    },
    {
      field: 'stock',
      headerName: 'Total Stock',
      type: 'number',
      width: 100,
    },
    {
      field: 'installed',
      headerName: 'Installed',
      type: 'number',
      width: 100,
    },
    {
      field: 'unused',
      headerName: 'Unused',
      type: 'number',
      width: 100,
      valueGetter: (param) => `${param.row.stock - param.row.installed}`,
    },
    {
      field: '%Used',
      headerName: '% Used',
      type: 'number',
      width: 100,
      valueGetter: (param) => `${Math.round(param.row.installed/param.row.stock * 100)}%`,
      cellClassName: (params) => {
        if (params.value == null) {
          return '';
        }

        return clsx('super-app', {
          negative: params.value < 100,
          positive: params.value > 100,
        });
      },
    },
  ];

  return (
    <>
      <div className="inventory" style={{ height: 800, width: '50%', margin:"5%" }}> Total Inventory
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          onRowClick={(params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement>>) => {
            event.defaultMuiPrevent = true;
            onInventoryEdit(params);
          }}
        />
      </div>
      <InventoryFormModal selectFilter={selectFilter} getUpdatedFilterCount={(info) => {getUpdatedFilterCount(info)}}/>
      <AlertDialog sendRequest={() => {sendRequest()}}/>

      <Grid className="alt-inventory" item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Total Inventory
        </Typography>
        <List dense={dense}>
          {filters.map((filter) => {
            return (
            <ListItem key={filter.id} onClick={(e) => onInventoryEdit(filter)}>
              <ListItemAvatar>
                <Avatar>
                  <CircularProgress variant="determinate" value={Math.round(filter.installed/filter.stock * 100)} />
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
                      {`${Math.round(filter.installed/filter.stock * 100)}%`}
                    </Typography>
                  </Box>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${filter.type}`}
                secondary={`Installed: ${filter.installed} Unused: ${filter.stock - filter.installed} Stock: ${filter.stock}`}
              />
            </ListItem>
          )})}
        </List>
      </Grid>
    </>
  )
};

export default Inventory;