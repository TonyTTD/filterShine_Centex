import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { backlogList } from '../atom_selector/recoil.js';
import axios from 'axios';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';

const ClientSearch = () => {
  let [useServiceLog, setServiceLog] = useRecoilState(backlogList);
  let [filterClient, setFilteredClient] = useState([]);

  const searchClient = (search) => {
    if (search.length >= 2) {
      let clients = filterClient.filter((client) => {
        let desensitizeClient = client.location.toLowerCase();
        if (desensitizeClient.indexOf(search) !== -1) {
          return client;
        }
      });

      setFilteredClient(clients);
    } else {
      setFilteredClient(useServiceLog);
    }
  };

  return (
    <div>
      <TextField
        required
        id="outlined-required"
        label="Search Client by Location"
        // placeholder="Enter value"
        defaultValue={""}
        size="medium"
        style={{width: "100ch", margin: "5ch"}}
        onChange={(e) => searchClient(e.target.value)}
      />
      <div style={{margin: '5ch'}}>
        {filterClient.map(client => {
          return (
            <>
              <Accordion style={{margin: '1ch'}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{client.location}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Add client info for updating
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </>
          )
        })}
      </div>
    </div>
  )
};

export default ClientSearch;