import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { requestModal, getAllFilterInfo } from '../atom_selector/recoil.js';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import InventoryFormModal from '../components/modal/currentInventoryModal.js';
import AlertDialog from '../components/modal/confirmationModal.js';

const Inventory = () => {
  let [filters, setFilters] = useRecoilState(getAllFilterInfo);
  let [useRequestModal, setRequestModal] = useRecoilState(requestModal);
  let [selectFilter, setSelectFilter] = useState({});
  const [updateFilterCount, setUpdateFilterCount] = useState({});
  const rows = filters;

  useEffect(() => {
    axios.get('http://localhost:4004/filtershine/api/filter/')
    .then(data => {setFilters(data.data);})
    .catch(err => {throw err;});
  }, []);

  const onInventoryEdit = (filterInfo) => {
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

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
    {
      field: 'type',
      headerName: 'Filter Type',
      width: 130,
    },
    {
      field: 'stock',
      headerName: 'Total Stock',
      type: 'number',
      width: 130,
    },
    {
      field: 'installed',
      headerName: 'Installed',
      type: 'number',
      width: 130,
    },
    {
      field: 'unused',
      headerName: 'Unused',
      type: 'number',
      width: 130,
      valueGetter: (param) => `${param.row.stock - param.row.installed}`,
    },
    {
      field: '%Used',
      headerName: '% Used',
      type: 'number',
      width: 130,
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
      <div style={{ height: 800, width: '60%', margin:"5%" }}> Total Inventory
      {/* <Box
        sx={{
          height: 300,
          width: '100%',
          '& .super-app-theme--cell': {
            backgroundColor: 'rgba(224, 183, 60, 0.55)',
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .super-app.negative': {
            backgroundColor: 'rgba(157, 255, 118, 0.49)',
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .super-app.positive': {
            backgroundColor: '#d47483',
            color: '#1a3e72',
            fontWeight: '600',
          },
        }}
      > */}
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
        {/* </Box> */}
      </div>
      <InventoryFormModal selectFilter={selectFilter} getUpdatedFilterCount={(info) => {getUpdatedFilterCount(info)}}/>
      <AlertDialog sendRequest={() => {sendRequest()}}/>
    </>
  )
}

export default Inventory;