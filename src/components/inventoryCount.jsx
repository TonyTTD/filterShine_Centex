import React from 'react';
import { useRecoilValue } from 'recoil';
import { serviceRequestSelector } from '../atom_selector/recoil.js';
import './comp-styling/inventoryCount.css';

var InventoryCount = () => {

  let currentInventory = useRecoilValue(serviceRequestSelector);
  // let currentInventory = useRecoilValue(serviceRequestSelector);

  return (
    <div className="inventory-container"><span className="title-filter">Total Filters</span>
      {currentInventory.totalType.map((filter, i) => {
        let filterTotal = currentInventory.totalCount[i];
        return (
        <div key ={i} className="inventory-count">
          {/* <span className="filter-id">{filter}</span> */}
          <span className="filter-type">{filter}:</span>
          <span className="filter-total">{filterTotal}</span>
        </div>
        );
      })}
    </div>
  );
};

export default InventoryCount;
