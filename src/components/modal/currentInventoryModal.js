import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { requestModal, selectedFilter, alertDialog, updateFilterCount } from '../../atom_selector/recoil.js';
import './modal.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

var InventoryFormModal = () => {
  let [useRequestModal, setRequestModal] = useRecoilState(requestModal);
  let [useAlertDialog, setAlertDialog] = useRecoilState(alertDialog);
  let [useFilterCount, setFilterCountToBeUpdated] = useRecoilState(updateFilterCount);
  let selectFilter = useRecoilValue(selectedFilter);
  let [addedFilterCount, setFilterCountAdded] = useState(null);
  let [removedFilterCount, setFilterCountRemoved] = useState(null);


  const addInventory = (add) => {
    setFilterCountAdded(parseInt(add));
  };

  const removeInventory = (remove) => {
    setFilterCountRemoved(parseInt(remove));
  };

  const onUpdate = () => {
    setFilterCountToBeUpdated({add: addedFilterCount, remove: removedFilterCount, filterId: selectFilter.row.id});
    setAlertDialog(true);
    setFilterCountAdded(null);
    setFilterCountRemoved(null);
    setRequestModal(false);
  };

  const onCancel = () => {
    setFilterCountAdded(null);
    setFilterCountRemoved(null);
    setRequestModal(false);
  };

  if(useRequestModal === true) {
    return (
      <div className="modal">
        <div className="modal-content">
            <div className="modal-body-filter"><h2>Edit Filter Type: {selectFilter.row.type}</h2>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>

              </div>
              <div>
                <TextField
                  id="outlined-filter-update"
                  label="Add filters"
                  onChange={(e) => {addInventory(e.target.value)}}
                  helperText="Enter the added quantity"
                >
                </TextField>
                <TextField
                  id="outlined-filter-update"
                  label="Remove filters"
                  onChange={(e) => {removeInventory(e.target.value)}}
                  helperText="Enter the removed quantity"
                >
                </TextField>
              </div>
              <Stack direction="column" spacing={2} margin={5}>
                <Button variant="contained" onClick={() => {onUpdate()}}>Update</Button>
                <Button variant="contained" onClick={() => onCancel()}>Cancel</Button>
              </Stack>
            </Box>
            </div>
        </div>
      </div>
    );
  }
};

export default InventoryFormModal;