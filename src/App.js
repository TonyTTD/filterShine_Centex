// import logo from './logo.svg';
import './App.css';
import React from 'react';


const Backlog = React.lazy(() => import('./components/backlog.jsx'));

var App = () => {
  return (
    <div className="App">
      <Backlog/>
    </div>
  );
};

export default App;

