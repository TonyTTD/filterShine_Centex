// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useRecoilState } from 'recoil';
import { requestModal } from './atom_selector/recoil.js';
import logo from './filtershine.png';

//trying this lazy to reduce the loading time on a webpage load
const Backlog = React.lazy(() => import('./components/backlog.jsx'));
const Calendar = React.lazy(() => import('./components/calendar.jsx'));
const InventoryCount = React.lazy(() => import('./components/inventoryCount.jsx'));
// const RequestFormModal = React.lazy(() => import('./components/modal/requestFormModal.js'));

var App = () => {
  let [useRequestModal, setRequestModal] = useRecoilState(requestModal);

  const addServiceTab = () => {
    console.log('service tab clicked')
    setRequestModal(true);
  };

  return (
    <div className="App">

      <div className="nav-bar">
        <div className="logo">
          <img className="logo-image" src={logo} alt="FilterShine" width="275px" height="75px">
          </img>
        </div>
        <div className="add-Service-tab" onClick={addServiceTab}>Add Service</div>
      </div>

      <div className="comp-container">
        <div className="calendar">
          <h2>At a Glance</h2>
          <Calendar/>
        </div>

        <Backlog/>

        <InventoryCount/>
      </div>
  </div>
  );
};

export default App;

