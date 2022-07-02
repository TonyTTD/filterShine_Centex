import React, { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getAllFilterInfo } from '../atom_selector/recoil.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const AddService = () => {
  const [newClientInfo, setNewClient] = useState(
    {
      company: '',
      contact: '',
      phone_number: '',
      poc_number: '',
      email: '',
      address: '',
      city: '',
      city_location: '',
      location: '',
      st: '',
      zip: null,
      filter_id: {},
      cycle: null,
      serviceon: '',
      route: '',
      title: ''
    }
  );

  const [filterList, setFilterList] = useState([]);
  let [allFilters, setFilters] = useRecoilState(getAllFilterInfo);

  useEffect(() => {
    axios.get(`http://localhost:4004/filtershine/api/filter`)
    .then(data => {setFilters(data.data)})
    .catch(err => {console.log(err);});
  }, []);

  const handleChange = (value, prop) => {
    let updating = newClientInfo;
    updating[prop] = value;
    setNewClient(updating);
  };

  const onSubmit = () => {
    if (!filterList.length) {
      alert('Please specify filters.');
      return;
    }
    for (let i = 0; i < filterList.length; i ++) {
      if (!filterList[i][2]) {
        alert('Please specify a value greater than 0 for each filter.')
        return;
      }
    }
    newClientInfo.createdon = moment(new Date()).format("YYYY-MM-DD");
    axios.post('http://localhost:4004/filtershine/api/client/new', {
      newClientInfo,
      filterList
    })
    .then(data => {console.log(data);})
    .catch(err => {console.log(err);});
  };

  const pickFilter = (filter) => {
    let filterInfo = filter.split(',');
    setFilterList([...filterList, [filterInfo[0], filterInfo[1]]])
  };

  const [dense, setDense] = useState(true);
  const [secondary, setSecondary] = useState(false);

  const deleteFilter = (filterId) => {
    let currentList = filterList.slice();
    for (let i = 0; i < currentList.length; i++) {
      if (currentList[i][0] === filterId) {
        currentList.splice(i, 1);
        setFilterList(currentList);
        break;
      }
    }
  };

  const updateFilterQty = (qty, filterId) => {
    let currentList = filterList.slice();
    for (let i = 0; i < currentList.length; i++) {
      if (currentList[i][0] === filterId) {
        if (currentList[i].length < 3) {
          currentList[i].push(qty);
        } else {
          currentList[i][2] = qty;
        }
        setFilterList(currentList);
        break;
      }
    }
  };

  const generate = (element) => {
    let filterId = Object.keys(filterList);
    let filterQtyandType = Object.values(filterList);

    return filterList.map(filter => {
      return (
        <ListItem key={filter[0]}
          secondaryAction={
            <>
            <TextField
                required
                id="outlined-required"
                label="Qty"
                // placeholder="Enter value"
                defaultValue={0}
                size="small"
                type="number"
                style={{width: "7ch", margin: "5px"}}
                onChange={(e) => updateFilterQty(e.target.value, filter[0])}
              />
            <IconButton edge="end" aria-label="delete" onClick={() => {deleteFilter(filter[0])}}>
              <DeleteIcon />
            </IconButton>
            </>
          } style= {{margin: "2ch"}}
        >
          <ListItemText
            primary={`${filter[1]}`}
            secondary={secondary ? 'Secondary text' : null}
          />
        </ListItem>
      )
    });
  };

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
            placeholder="Company Name"
            onChange={(e) => {handleChange(e.target.value, 'company')}}
          />
          <TextField
            required
            id="outlined-required"
            label="Location Name"
            placeholder="Location Name"
            onChange={(e) => {handleChange(e.target.value, 'location')}}
          />
          <TextField
            required
            id="outlined-required"
            label="Location Number"
            placeholder="Location Number"
            onChange={(e) => {handleChange(e.target.value, 'phone_number')}}
          />
          <TextField
            required
            id="outlined-required"
            label="Contact"
            placeholder="Point of Contact"
            onChange={(e) => {handleChange(e.target.value, 'contact')}}
          />
          <TextField
            required
            id="outlined-required"
            label="POC Phone #"
            placeholder="Enter Value"
            onChange={(e) => {handleChange(e.target.value, 'poc_number')}}
          />
          <TextField
            required
            id="outlined-required"
            label="POC Title"
            placeholder="Enter Value"
            onChange={(e) => {handleChange(e.target.value, 'title')}}
          />
          <TextField
            required
            id="outlined-required"
            label="POC Email"
            placeholder="Enter Value"
            onChange={(e) => {handleChange(e.target.value, 'email')}}
          />
        </div> Company Info:
        <div>
          <TextField
            required
            id="outlined-required"
            label="Company Address"
            placeholder="Enter Value"
            onChange={(e) => {handleChange(e.target.value, 'address')}}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="City"
            placeholder="Enter Value"
            onChange={(e) => {handleChange(e.target.value, 'city')}}
          />
          <TextField
            required
            id="outlined-required"
            label="State"
            placeholder="Enter Value"
            onChange={(e) => {handleChange(e.target.value, 'st')}}
          />
          <TextField
            required
            id="outlined-required"
            label="ZIP"
            placeholder="Enter Value"
            onChange={(e) => {handleChange(e.target.value, 'zip')}}
          />
        </div> Service Info:
        <div>
        <TextField
            required
            id="outlined-required"
            label="City-Location"
            placeholder="Enter Value"
            onChange={(e) => {handleChange(e.target.value, 'city_location')}}
          />
          <TextField
            required
            id="outlined-required"
            label="Route"
            placeholder="Enter Value"
            onChange={(e) => {handleChange(e.target.value, 'route')}}
          />
          <TextField
            required
            id="outlined-required"
            label="Frequency"
            placeholder="Enter cycle"
            onChange={(e) => {handleChange(e.target.value, 'cycle')}}
          />
          <TextField
            required
            id="outlined-required"
            label="Service On"
            placeholder="Enter date"
            onChange={(e) => {handleChange(e.target.value, 'serviceon')}}
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
            onChange={(e) => {pickFilter(e.target.value)}}
            helperText="Please select your filter type"
          >
            {filterTypes.map((option) => (
              <MenuItem key={option.type} value={`${option.id},${option.type}`}>
                {option.type}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Box>
      <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" style={{width: "25ch"}}>
            Filter Cart: {filterList.length ? "" : "No filters added."}
          </Typography>
            <List dense={dense}>
              {generate()}
            </List>
        </Grid>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={() => {onSubmit()}}>Add Service</Button>
        <Button variant="contained">Cancel</Button>
      </Stack>
    </>
  )
};

export default AddService;