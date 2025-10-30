import React from 'react';
import { useRecoilState } from 'recoil';
import { alertDialog } from '../../atom_selector/recoil.js';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = (props) => {
  let [useAlertDialog, setAlertDialog] = useRecoilState(alertDialog);

  const handleClose = () => {
    setAlertDialog(false);
  };

  const handleAgree = () => {
    props.sendRequest();
    setAlertDialog(false);
  };

  return (
    <div>
      <Dialog
        open={useAlertDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Update Services"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirm update.
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