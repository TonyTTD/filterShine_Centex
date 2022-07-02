import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { requestModal, selectedFilter, getAllFilterInfo } from '../atom_selector/recoil.js';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import InventoryFormModal from '../components/modal/currentInventoryModal.js';
import AlertDialog from '../components/modal/confirmationModal.js';

const Inventory = () => {
  let [filters, setFilters] = useRecoilState(getAllFilterInfo);
  let [useRequestModal, setRequestModal] = useRecoilState(requestModal);
  let [selectFilter, setSelectFilter] = useRecoilState(selectedFilter);
  const rows = filters;
  
  useEffect(() => {
    axios.get('http://localhost:4004/filtershine/api/filter/')
    .then(data => {setFilters(data.data);})
    .catch(err => {throw err;});
  }, []);

  const onInventoryEdit = (id) => {
    setSelectFilter(id);
    setRequestModal(true);
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
    }
  ];



  return (
    <>
      <div style={{ height: 700, width: '50%', margin:"5%" }}> Total Inventory
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onRowClick={(params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement>>) => {
            event.defaultMuiPrevent = true;
            onInventoryEdit(params);
          }}
        />
      </div>
      <InventoryFormModal/>
      <AlertDialog/>
    </>
  )
}

export default Inventory;