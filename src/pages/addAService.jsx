import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getAllFilterInfo } from '../atom_selector/recoil.js';
import './page-styling/addAService.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const AddService = () => {
  const [filterList, setFilterList] = useState('');
  const allFilters = useRecoilValue(getAllFilterInfo);

  const handleChange = (event) => {
    setFilterList(event.target.value);
  };

  //replace this with the filters in the database
  const filterTypes = allFilters;

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        margin="5%"
      > Client Info:
        <div className="add-a-service-client">
          <TextField
            required
            id="outlined-required"
            label="Company Name"
            // defaultValue="Company Name"
            placeholder="Company Name"
          />
          <TextField
            required
            id="outlined-required"
            label="POC"
            // defaultValue="Company Name"
            placeholder="Point of Contact"
          />
          <TextField
            required
            id="outlined-required"
            label="POC Phone #"
            // defaultValue="Company Name"
            placeholder="Enter Value"
          />
          <TextField
            required
            id="outlined-required"
            label="POC Title"
            // defaultValue="Company Name"
            placeholder="Enter Value"
          />
          <TextField
            required
            id="outlined-required"
            label="POC Email"
            // defaultValue="Company Name"
            placeholder="Enter Value"
          />
        </div> Company Info:
        <div>
          <TextField
            required
            id="outlined-required"
            label="Company Address Line 1"
            // defaultValue="Company Name"
            placeholder="Enter Value"
          />
          <TextField
            required
            id="outlined-required"
            label="Company Address Line 2"
            // defaultValue="Company Name"
            placeholder="Enter Value"
          />
          <TextField
            required
            id="outlined-required"
            label="Company Address Line 3"
            // defaultValue="Company Name"
            placeholder="Enter Value"
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="City"
            // defaultValue="Company Name"
            placeholder="Enter Value"
          />
          <TextField
            required
            id="outlined-required"
            label="State"
            // defaultValue="Company Name"
            placeholder="Enter Value"
          />
          <TextField
            required
            id="outlined-required"
            label="ZIP"
            // defaultValue="Company Name"
            placeholder="Enter Value"
          />
        </div> Service Info:
        <div>
          <TextField
            required
            id="outlined-required"
            label="Route"
            // defaultValue="Company Name"
            placeholder="Enter Value"
          />
          <TextField
            required
            id="outlined-required"
            label="Frequency"
            // defaultValue="Company Name"
            placeholder="Enter cycle"
          />
          <TextField
            required
            id="outlined-required"
            label="Service On"
            // defaultValue="Company Name"
            placeholder="Enter date"
          />
        </div>
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-select-filter"
            select
            label="Select Filter Type"
            value={filterList}
            onChange={handleChange}
            helperText="Please select your filter type"
          >
            {filterTypes.map((option) => (
              <MenuItem key={option.type} value={option.type}>
                {option.type}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Box>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" disabled>Add Service</Button>
        <Button variant="contained">Cancel</Button>
      </Stack>
    </>
  )
};

export default AddService;