import axios from 'axios';
import Config from '../../const/config';

class FindLocationAPI {

  findGeoLocation = (store_id:number, data:any) => {
    const apiURL = `${Config.STORE_SERVICE_API_URL}dc/store/${store_id}/locations/co_ordinates`;
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
            reject(error);
          }
        });
    });
  };

  findAddLocation = (store_id:number, data:any) => {
    const apiURL = `${Config.STORE_SERVICE_API_URL}dc/store/${store_id}/locations/address`;
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
            reject(error)
          }
        });
    });
  };

}

const instance = new FindLocationAPI();

export default instance;
