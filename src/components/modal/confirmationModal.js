import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { alertDialog, updateFilterCount } from '../../atom_selector/recoil.js';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

const AlertDialog = () => {
  let [useAlertDialog, setAlertDialog] = useRecoilState(alertDialog);
  let updateFilter = useRecoilValue(updateFilterCount);

  const handleClose = () => {
    setAlertDialog(false);
  };

  const handleAgree = () => {
    axios.put('http://localhost:4004/filtershine/api/filter', updateFilter)
    .catch(err => {throw err});
    setAlertDialog(false);
  }

  return (
    <div>
      <Dialog
        open={useAlertDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Update Inventory Count?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirm update/deletion.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;