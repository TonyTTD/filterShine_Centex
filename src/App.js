import './App.css';
import React, {useEffect} from 'react';
import { useRecoilState } from 'recoil';
import { backlogList } from './atom_selector/recoil.js';
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Schedule from './pages/schedule.jsx';
// import AddService from './pages/addAService.jsx';
// import Inventory from './pages/inventory.jsx';
// import ResponsiveAppBar from './NavBar/navBar.jsx';
const Schedule = React.lazy(() => import('./pages/schedule.jsx'));
const AddService = React.lazy(() => import('./pages/addAService.jsx'));
const Inventory = React.lazy(() => import('./pages/inventory.jsx'));
const ResponsiveAppBar = React.lazy(() => import('./NavBar/navBar.jsx'));

var App = () => {
  let [useServiceLog, setServiceLog] = useRecoilState(backlogList);

  useEffect(() => {
    axios({
      baseURL: 'http://localhost:4004',
      url: '/filtershine/api/client',
      method: 'get'
    })
    .then(data => {setServiceLog(data.data)})
    .catch(err => {throw err});

  },[]);

  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar/>
        <Routes>
          <Route path="/schedule" element={<Schedule/>}/>
          <Route path="/inventory" element={<Inventory/>}/>
          <Route path="/add-a-service" element={<AddService/>}/>
        </Routes>
      </Router>
  </div>
  );
};

export default App;

