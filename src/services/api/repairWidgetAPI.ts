import axios from "axios";
import Config from '../../config/config';

class RepairWidgetAPI {

  getRepairLookup = (locale: string, types:any[]) => {
    let type:string = '';
    for (let i = 0; i < types.length; i++) {
      i === 0 ? type += `type[]=${types[i]}` : type += `&type[]=${types[i]}`;
    }
    const apiURL = `${Config.REPAIR_SERVICE_API_URL}dc/${locale}/repair/lookups?${type}`;
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiURL}`)
        .then(response => {
          if(response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch(error => {
          if(error) {
            console.log('error response in get repair look-up: ', error);
          }
        });
    });
  }

  getDeliveryMethods = (store_id:number, include_disabled:boolean) => {
    const apiURL = `${Config.REPAIR_SERVICE_API_URL}dc/store/${store_id}/delivery_methods?include_disabled=${include_disabled}`;
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiURL}`)
        .then(response => {
          if(response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch(error => {
          if(error) {
            console.log('error response in get delivery methods: ', error);
          }
        });
    });
  }

  getRepairsOfferedDevice = (
    locale: string,
    store_id: number,
    per_page: number,
    page: number,
    included_voided: boolean,
    product_id: number,
    name_sort_order: string,
    is_active: boolean
  ) => {
    const apiURL = `${Config.REPAIR_SERVICE_API_URL}dc/${locale}/store/${store_id}/repair?per_page=${per_page}?page=${page}?include_voided=${included_voided}?product_id=${product_id}?name_sort_order=${name_sort_order}?is_active=${is_active}`;
    console.log(apiURL);
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiURL}`)
        .then(response => {
          if(response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch(error => {
          if(error) {
            console.log('error response in get repairs offered device: ', error);
          }
        });
    });
  }

  postAppointmentQuote = (store_id:number, location_id:number, type:string) => {
    const apiURL:string = `${Config.REPAIR_SERVICE_API_URL}dc/store/${store_id}/repair/location/${location_id}/appointment`;
    /* Here, type should be 'QUOTE' or 'APPOINTMENT'. */
    const data:any = { type: type };
    return new Promise((resolve, reject) => {
      axios
        .post(`${apiURL}`, data)
        .then(response => {
          if(response) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch(error => {
          if (error) {
            console.log('error response in post appointment quote: ', error);
          }
        });
    });
  };

}

const instance = new RepairWidgetAPI();

export default instance;
