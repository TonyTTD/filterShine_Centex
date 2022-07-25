import React from 'react';
import { useRecoilState } from 'recoil';
import { backlogList } from '../atom_selector/recoil.js';

const ClientSearch = React.lazy(() => import('../components/clientSearch.jsx'));

const Client = () => {

  return (
    <ClientSearch/>
  )
};

export default Client;