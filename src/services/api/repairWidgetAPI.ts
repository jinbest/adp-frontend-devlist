import axios from 'axios';
import Config from '../../config/config';

class RepairWidgetAPI {

  getDeviceBrands = (store_id: number, per_page: number, page: number, is_enabled: boolean, searchText:string) => {
    let apiURL = `${Config.PRODUCT_SERVICE_API_URL}dc/store/${store_id}/brands?per_page=${per_page}&page=${page}&is_enabled=${is_enabled}`;
    if (searchText) {
      apiURL += `&name=${searchText}`
    }
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
            console.log('error response in get device brand: ', error);
          }
        });
    });
  }

  getBrandProducts = (store_id:number, per_page:number, page:number, included_voided:boolean, brand_id:number) => {
    const apiURL = `${Config.PRODUCT_SERVICE_API_URL}dc/store/${store_id}/products?per_page=${per_page}&page=${page}&include_voided=${included_voided}&brand_id=${brand_id}`;
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
            console.log('error response in get brand products: ', error);
          }
        });
    });
  }

  getRepairLookup = (locale: string, types:any[]) => {
    let type:string = '';
    for (let i = 0; i < types.length; i++) {
      i === 0 ? type += `types=${types[i]}` : type += `&types=${types[i]}`;
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
    const apiURL = `${Config.REPAIR_SERVICE_API_URL}dc/${locale}/store/${store_id}/repair?per_page=${per_page}&page=${page}&include_voided=${included_voided}&product_id=${product_id}&name_sort_order=${name_sort_order}&is_active=${is_active}`;
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

  postAppointmentQuote = (data:any) => {
    const apiURL:string = `${Config.REPAIR_SERVICE_API_URL}dc/store/${data.store_id}/repair/location/${data.location_id}/appointment`;
    
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
