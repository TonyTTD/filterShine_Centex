import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchBarFilterByClient, searchBarFilter } from '../atom_selector/recoil.js';

const NavSearchBar = () => {

  let test = useRecoilValue(searchBarFilter);
  let [useSearchBar, setSearchBar] = useRecoilState(searchBarFilterByClient);

  const searchClient = (search) => {
    setSearchBar(search.value);
  };

  return (
    <input className="search-tab" type="search" placeholder="Search by client" onChange={(e) => {searchClient(e)}}></input>
  )
};

export default NavSearchBar;