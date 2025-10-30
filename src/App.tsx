import "./App.css";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { backlogList } from "./atom_selector/recoil.js";
import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { database } from "pg/lib/defaults.js";

const Schedule = React.lazy(() => import("./pages/Schedule.js"));
const AddService = React.lazy(() => import("./pages/AddAService.js"));
const Inventory = React.lazy(() => import("./pages/Inventory.js"));
const Client = React.lazy(() => import("./pages/Client.js"));
const ResponsiveAppBar = React.lazy(() => import("./NavBar/navBar.jsx"));

var App = () => {
  // let [useServiceLog, setServiceLog] = useRecoilState(backlogList);

  useEffect(() => {
    axios({
      // baseURL: process.env.REACT_APP_API_URL,
      baseURL: "http://localhost:3003",
      url: "/filtershine/api/client",
      method: "get",
    })
      .then((data) => {
        // setServiceLog(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/add-a-service" element={<AddService />} />
          <Route path="/client" element={<Client />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
