import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { backlogList } from '../atom_selector/recoil.js';

const ClientSearch = React.lazy(() => import('../components/clientSearch.jsx'));

const Client = () => {
  let [useServiceLog, setServiceLog] = useRecoilState(backlogList);


  return (
    <ClientSearch/>
  )
};

export default Client;