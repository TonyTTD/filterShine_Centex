import React from 'react';
import { useRecoilValue } from 'recoil';
import { inventorySelector, serviceRequestSelector } from '../atom_selector/recoil.js';
import './comp-styling/inventoryCount.css';

var InventoryCount = () => {

  let currentInventory = useRecoilValue(serviceRequestSelector);
  // let currentInventory = useRecoilValue(serviceRequestSelector);

  return (
    <div className="inventory-container">Total Filters
      {currentInventory.totalType.map((filter, i) => {
        let filterTotal = currentInventory.totalCount[i];
        return (
        <div key ={i} className="inventory-count">
          {/* <span className="filter-id">{filter}</span> */}
          <span className="filter-type">{filter}</span>
          <span className="filter-total">{filterTotal}</span>
        </div>
        );
      })}
    </div>
  );
};

export default InventoryCount;

// address: "69 sesame st"
// city: "houston"
// client_id: 1
// company: "bigRich"
// createdAt: "12/07/21"
// cycle: 14
// email: "money@blahoo.com"
// filter_id: {14: {…}, 15: {…}}
// phone_number: "(123)234-5434"
// poc: "poorGuy123"
// serviceOn: "12/14/21"
// service_id: 1
// state: "texas"