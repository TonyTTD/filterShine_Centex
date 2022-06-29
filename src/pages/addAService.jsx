import React, { useEffect, useState } from 'react';
import './page-styling/addAService.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const AddService = () => {
  const [filterList, setFilterList] = useState('');

  const handleChange = (event) => {
    setFilterList(event.target.value);
  };

  // const addFilterToList = (filter) => {
  //   console.log(filter.target.value);
  //   if (filter.target.value) {
  //     setFilterList([...currentFilterList, filter.target.value]);
  //   }
  // };

  //replace this with the filters in the database
  const filterTypes = [
    {
      type: "SA10X20",
    },
    {
      type: "SA20X20",
    },
    {
      type: "SA10X30",
    },
    {
      type: "SA20X30",
    }
  ]

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
          id="outlined-select-currency"
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

      {/* <Button variant="contained" href="#contained-buttons">
        Draft */}
      {/* </Button> */}
    </Stack>
    </>

    // <div className="addService-container">
    //   <div>Company Name:
    //     <input className="service-input" type="text" placeholder="Enter name..."></input>
    //   </div>
    //   <div>Point of Contact (POC):
    //     <input className="service-input" type="text" placeholder="Enter name..."></input>
    //   </div>
    //   <div>POC Number:
    //     <input className="service-input" type="text" placeholder="Enter number..."></input>
    //   </div>
    //   <div>POC Title:
    //     <input type="text" placeholder="Enter name..."></input>
    //   </div>
    //   <div>Email:
    //     <input type="text" placeholder="Enter email..."></input>
    //   </div>
    //   <div>Address:
    //     <input type="text" placeholder="Enter Line address 1..."></input>
    //     <input type="text" placeholder="Enter Line address 2..."></input>
    //     <input type="text" placeholder="Enter Line address 3..."></input>
    //   </div>
    //   <div>City:
    //     <input type="text" placeholder="Enter city..."></input>
    //   </div>
    //   <div>State:
    //     <input type="text" placeholder="Enter state..."></input>
    //   </div>
    //   <div>Zip:
    //     <input type="text" placeholder="Enter zip code..."></input>
    //   </div>
    //   <div>Route:
    //     <input type="text" placeholder="Enter route..."></input>
    //   </div>
    //   <div>Frequency (every x weeks):
    //     <input type="text" placeholder="Enter cycle..."></input>
    //   </div>
    //   <div>Service Date:
    //     <input type="text" placeholder="Enter start date..."></input>
    //   </div>
    //   <div>Filter Type:
    //     <input list="filters" onClick={(e) => {addFilterToList(e)}}></input>
    //     <datalist id="filters">
    //       <option value="test1"></option>
    //       <option value="test2"></option>
    //     </datalist>
    //     {currentFilterList.map(list => <div>{list}<input type="text" placeholder="Enter a qty"></input></div>)}
    //   </div>
    // </div>
  )
};

export default AddService;

// {
//   id: 1,
//   client_id: 1,
//   company: 'bigRich',
//   poc: 'poorGuy123',
//   phone_number: '(123)234-5434',
//   poc_number: '(123)234-5555',
//   email: 'money@blahoo.com',
//   address: '69 sesame st',
//   city: 'houston',
//   state: 'texas',
//   zip: 76355,
//   filter_id:
//     { 14: {type: 'SA16x16', installed: 6, price: '$31.78'},
//       15: {type: 'SA16x20', installed: 5, price: '$41.10'}
//     },
//   cycle: 7,
//   createdAt: '12/07/21',
//   serviceon: '05/05/22',
//   route: 'South',
//   title: 'Manager'
// },