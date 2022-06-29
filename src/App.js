import './App.css';
import React, {useEffect} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { backlogList, searchBarFilterByClient, serviceLogSelector } from './atom_selector/recoil.js';
// import logo from './filtershine.webp';
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Schedule from './pages/schedule.jsx';
import AddService from './pages/addAService.jsx';
import Inventory from './pages/inventory.jsx';
// import NavBar from './NavBar/navBar.jsx';
import ResponsiveAppBar from './NavBar/navBar.jsx'

//trying this lazy to reduce the loading time on a webpage load
// const Backlog = React.lazy(() => import('./components/backlog.jsx'));
// const Calendar = React.lazy(() => import('./components/calendar.jsx'));
// const InventoryCount = React.lazy(() => import('./components/inventoryCount.jsx'));

var App = () => {

  let [useServiceLog, setServiceLog] = useRecoilState(backlogList);

  // let apiClients = useRecoilValue(serviceLogSelector);
  useEffect(() => {
    // setServiceLog(apiClients);
    axios({
      baseURL: 'http://localhost:4004',
      url: '/filtershine/api/client',
      method: 'get'
    })
    // axios.get('/filtershine/api/client/')
    .then(data => {console.log(data); setServiceLog(data.data)})
    .catch(err => {console.log('failed component mount request', err); throw err});

  },[]);

  return (

    <div className="App">
      {/* <div className="logo"> */}
        {/* <img className="logo-image" src={logo} alt="FilterShine" width="275px" height="75px"></img> */}
      {/* </div> */}
      <Router>
        {/* <NavBar/> */}
        <ResponsiveAppBar/>
        <Routes>
          <Route path="/schedule" element={<Schedule/>}/>
          <Route path="/inventory" element={<Inventory/>}/>
          <Route path="/add-a-service" element={<AddService/>}/>
        </Routes>
      </Router>
      {/* <div className="comp-container">
        <div className="calendar">
          <h2>At a Glance</h2>
          <Calendar/>
        </div>
        <div className="backlog-title">Service Logs</div>
        <Backlog/>
        <InventoryCount/>
      </div> */}
  </div>

  );
};

export default App;

