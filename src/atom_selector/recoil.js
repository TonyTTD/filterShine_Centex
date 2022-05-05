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
    serviceOn: '',
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

export const selectedServiceSelector = selector({
  key: 'selectedServiceSelector',
  get: ({get}) => {
    let serviceLog = get(selectedService);

    let filtersUsed = Object.values(serviceLog.filter_id);

    return filtersUsed;
  }
})

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
        let currentDate = new Date(date.serviceOn);
        let convertedDate = moment(currentDate).format('MM-DD-YYYY');

        if (convertedDate === selectDate[0]) {
          return true;
        }

        if (convertedDate < selectDate[0]) {
          for (let i = 0; i < 1000; i++) {
            currentDate.setDate(currentDate.getDate() + date.cycle);
            let temp = moment(currentDate).format('MM-DD-YYYY');
            //checks if the next cycle date is greater than the min range
            if (temp <= selectDate[0]) {
              //checks if its less than the max range
              if (temp === selectDate[0]) {
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

        if (convertedDate === selectDate[0] || convertedDate === selectDate[1]) {
          return true;
        }

        if (convertedDate < selectDate[0]) {
          for (let i = 0; i < 1000; i++) {
            currentDate.setDate(currentDate.getDate() + date.cycle);
            let temp = moment(currentDate).format('MM-DD-YYYY');
            //checks if the next cycle date is greater than the min range
            if (temp >= selectDate[0]) {
              //checks if its less than the max range
              if (temp <= selectDate[1]) {
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
