import { atom, selector } from 'recoil';
import sample from './sampleData.js';
import filterCount from './sampleFilterCount.js';
import moment from 'moment';
import axios from 'axios';

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

export const selectedService = atom({
  key: 'selectedService',
  default: {
    service_id: null,
    client_id: null,
    company: '',
    poc: '',
    phone_number: '',
    poc_number: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: 76355,
    filter_id:
      { 0: {type: '', installed: null, price: ''},
        100: {type: '', installed: null, price: ''}
      },
    cycle: null,
    createdAt: '',
    serviceon: '',
    route: '',
    title: ''}
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

export const serviceLogSelector = selector({
    key: 'serviceLogSelector',
    get: async ({get}) => {
      const res = await axios.get('/filtershine/api/client');
      console.log(res);
    }
});
// export const serviceLogSelector = selector({
//   key: 'serviceLogSelector',
//   get: async ({get}) => {
//     let fromDate = moment(get(selectedDate)[0]).format('YYYY-MM-DD');
//     let toDate = moment(get(selectedDate)[1]).format('YYYY-MM-DD');
//     if (!toDate) {
//       console.log(fromDate, toDate);
//       const res = await axios.get(`/filtershine/api/client?from=${fromDate}&to=${toDate}`);
//       // console.log(res);
//     }

//   }
// })

export const selectedServiceSelector = selector({
  key: 'selectedServiceSelector',
  get: ({get}) => {
    let serviceLog = get(selectedService);

    let filtersUsed = Object.values(serviceLog.filter_id);

    return filtersUsed;
  }
});

export const serviceRequestSelector = selector({
  key: 'serviceRequestSelector',
  get: ({get}) => {
    let log = get(backlogList);

    let selectDate = get(selectedDate);
    let enabledRange = get(enableDateRange);

    let filterLog;
    // Filters based on a specific day
    if (!enabledRange) {
      filterLog = log.filter(date => {
        var currentDate = moment(date.serviceon);
        var selectedDateObj = moment(selectDate[0]);
        if (currentDate.isSame(selectedDateObj)) {
          return true;
        }

        if (currentDate.isBefore(selectedDateObj)) {
          for (let i = 0; i < 1000; i++) {
            currentDate.add(date.cycle, 'days');

            if (currentDate.isSame(selectedDateObj)) {
              return true;
            }
            if (currentDate.isAfter(selectedDateObj)) {
              return false;
            }
          }
        }
      })
    } else {
      filterLog = log.filter(date => {
        var currentDate = moment(date.serviceon);
        var selectedDateObjFrom = moment(selectDate[0]);
        var selectedDateObjTo = moment(selectDate[1]);

        if (currentDate.isSame(selectedDateObjFrom) || currentDate.isSame(selectedDateObjTo)) {
          return true;
        }

        if (currentDate.isSameOrAfter(selectedDateObjFrom) && currentDate.isSameOrBefore(selectedDateObjTo)) {
          return true;
        }

        if (currentDate.isBefore(selectedDateObjFrom)) {
          for (let i = 0; i < 1000; i++) {
            currentDate.add(date.cycle, 'days');

            if (currentDate.isSameOrAfter(selectedDateObjFrom)) {
              //checks if its less than the max range
              if (currentDate.isSameOrBefore(selectedDateObjTo)) {
                return true;
              }
              return false;
            }
          }
        }
      })
    }
    console.log('filtered range', filterLog);

    if (filterLog.length === 0) {
      filterLog = [];
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
