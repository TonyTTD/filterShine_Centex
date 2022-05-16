import './App.css';
import React, {useEffect} from 'react';
import { useRecoilState } from 'recoil';
import { backlogList } from './atom_selector/recoil.js';
import logo from './filtershine.webp';
import axios from 'axios';

//trying this lazy to reduce the loading time on a webpage load
const Backlog = React.lazy(() => import('./components/backlog.jsx'));
const Calendar = React.lazy(() => import('./components/calendar.jsx'));
const InventoryCount = React.lazy(() => import('./components/inventoryCount.jsx'));


var App = () => {

  let [useServiceLog, setServiceLog] = useRecoilState(backlogList);

  useEffect(() => {
    const res = axios({
      baseURL: 'http://localhost:4000',
      url: '/filtershine/api/client',
      method: 'get',
      // responseType: 'json',
    }).then(data => {setServiceLog(data.data)}).catch(err => {console.log(err)});
  },[]);

  const addServiceTab = () => {
    console.log('service tab clicked')
  };

  return (
    <div className="App">
      <div className="logo">
        <img className="logo-image" src={logo} alt="FilterShine" width="275px" height="75px"></img>
      </div>
      <input className="search-tab" type="search" placeholder="Search by client" onClick={addServiceTab}></input>
      <div className="nav-bar">
        <div id="tabs" className="home-tab" onClick={addServiceTab}>Home</div>
        <div id="tabs" className="add-Service-tab" onClick={addServiceTab}>Add Service</div>
        <div id="tabs" className="inventory-tab" onClick={addServiceTab}>Inventory</div>
        <div id="tabs" className="pricing-tab" onClick={addServiceTab}>Pricing</div>
        <div id="tabs" className="home-tab" onClick={addServiceTab}>Contacts</div>
        <div id="tabs" className="about-tab" onClick={addServiceTab}>About Us</div>
      </div>
      <div className="comp-container">
        <div className="calendar">
          <h2>At a Glance</h2>
          <Calendar/>
        </div>
        <div className="backlog-title">Service Logs</div>
        <Backlog/>
        <InventoryCount/>
      </div>
  </div>
  );
};

export default App;

