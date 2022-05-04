import { atom, selector, useRecoilState } from 'recoil';
import sample from './sampleData.js';
import filterCount from './sampleFilterCount.js';
import moment from 'moment';

// ---- Display the existing service requests
export const backlogList = atom({
  key: 'backlogList',
  default: sample,
});

// ---- Display the current inventory
export const inventoryCount = atom({
  key: 'inventoryCount',
  default: filterCount,
});

export const requestModal = atom({
  key: 'requestModal',
  default: false
});

//---- Stores the picked date
export const selectedDate = atom({
  key: 'selectedDate',
  default: moment(new Date()).format('MM-DD-YYYY')
});

export const serviceRequestSelector = selector({
  key: 'serviceRequestSelector',
  get: ({get}) => {
    let log = get(backlogList);
    let selectDate = get(selectedDate);

    let filterLog = log.filter(date => {
      let convertedDate = moment(date.serviceOn).format('MM-DD-YYYY');
      return convertedDate === selectDate;
    });

    // console.log(filterLog);
    // let x = moment('2022-05-03').format('YYYY-MM-DD')
    // console.log(x);
    // console.log(moment(new Date() - new Date(x)).format('DD'))
    // console.log(new Date(x) === new Date()) //use this for comparison range

    if (filterLog.length === 0) {
      filterLog = log;
      let filterArray = {};
      filterLog.forEach(filter => {
        for (let type in filter.filter_id) {
          let filterType = filter.filter_id[type].type;
          let filterInstalled = filter.filter_id[type].installed;
          console.log(filterType);
          if (filterArray[filterType] === undefined) {
            filterArray[filterType] = filterInstalled;
          } else {
            filterArray[filterType] += filterInstalled;
          }
        }
      });

      let totalType = Object.keys(filterArray);
      let totalCount = Object.values(filterArray);

      return {filterLog, totalType, totalCount};
    } else {
      let filterArray = {};
      filterLog.forEach(filter => {
        for (let type in filter.filter_id) {
          let filterType = filter.filter_id[type].type;
          let filterInstalled = filter.filter_id[type].installed;
          console.log(filterType);
          if (filterArray[filterType] === undefined) {
            filterArray[filterType] = filterInstalled;
          } else {
            filterArray[filterType] += filterInstalled;
          }
        }
      });

      let totalType = Object.keys(filterArray);
      let totalCount = Object.values(filterArray);

      return {filterLog, totalType, totalCount};
    }
  }
});

export const inventorySelector = selector({
  key: 'inventorySelector',
  get: ({get}) => {
    let log = get(backlogList);
    let filterId = Object.keys(log.filter_id);
    let total = Object.values(log.filter_id);
    return {filterId, total};
  }
});