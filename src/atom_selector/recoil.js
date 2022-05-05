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
  default: [moment(new Date()).format('MM-DD-YYYY'),""]
});

export const enableDateRange = atom({
  key :'enableDateRange',
  default: false
});

export const serviceRequestSelector = selector({
  key: 'serviceRequestSelector',
  get: ({get}) => {
    let log = get(backlogList);
    let selectDate = get(selectedDate);
    let enabledRange = get(enableDateRange);

    let test = new Date(log[0].serviceOn)
    console.log(test.setDate(test.getDate() + 2))
    console.log(test.toDateString())

    let filterLog;
    // Filters based on a specific day
    if (!enabledRange) {
      filterLog = log.filter(date => {
        let currentDate = new Date(date.serviceOn);
        let convertedDate = moment(currentDate).format('MM-DD-YYYY');

        console.log('-', convertedDate, selectDate[0]);

        if (convertedDate < selectDate[0]) {
          for (let i = 0; i < 1000; i++) {
            currentDate.setDate(currentDate.getDate() + date.cycle);
            let temp = moment(currentDate).format('MM-DD-YYYY');
            //checks if the next cycle date is greater than the min range
            if (temp <= selectDate[0]) {
              console.log('----', currentDate.toDateString(), selectDate[0]);
              //checks if its less than the max range
              if (temp === selectDate[0]) {
                console.log('final', currentDate.toDateString(), selectDate[1])
                return true;
              }

              if (temp > selectDate[0]) {
                return false;
              }
            } else {
              return false;
            }
          }
        }
      })
    } else {
      filterLog = log.filter(date => {
        let currentDate = new Date(date.serviceOn);
        let convertedDate = moment(currentDate).format('MM-DD-YYYY');

        console.log('-', convertedDate, selectDate[0]);

        if (convertedDate < selectDate[0]) {
          for (let i = 0; i < 1000; i++) {
            currentDate.setDate(currentDate.getDate() + date.cycle);
            let temp = moment(currentDate).format('MM-DD-YYYY');
            console.log('---', currentDate.toDateString(), selectDate[0])
            //checks if the next cycle date is greater than the min range
            if (temp >= selectDate[0]) {
              console.log('----', currentDate.toDateString(), selectDate[0]);
              //checks if its less than the max range
              if (temp <= selectDate[1]) {
                console.log('final', currentDate.toDateString(), selectDate[1])
                return true;
              }
              return false;
            }
          }
        }
      })
    }
    console.log('filtered range', filterLog);
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