import axios from 'axios'
import Config from '../../config/config'

class AppLoadAPI {

  getStoresDetail = (apexDomain: string, include_children: boolean) => {
    const apiURL = `${Config.STORE_SERVICE_API_URL}dc/store/domain/${apexDomain}?include_children=${include_children}`
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiURL}`)
        .then((response) => {
          if (response) {
            resolve(response)
          } else {
            reject(response)
          }
        })
        .catch((error) => {
          if (error) {
            reject(error)
          }
        })
    })
  }

  getFeatures = (store_id: number) => {
    const apiURL = `${Config.ADMIN_SERVICE_API_URL}dc/store/${store_id}/features/toggle?types=FRONTEND`
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiURL}`)
        .then((response) => {
          if (response) {
            resolve(response)
          } else {
            reject(response)
          }
        })
        .catch((error) => {
          if (error) {
            reject(error)
          }
        })
    })
  }

  getStoreConfig = (store_id: number) => {
    const apiStoreURL = `${Config.STORE_SERVICE_API_URL}dc/store/${store_id}/config`
    const apiCommonURL = `${Config.STORE_SERVICE_API_URL}dc/store/config/common`
    const storeData = new Promise((resolve, reject) => {
      axios
        .get(`${apiStoreURL}`)
        .then((response) => {
          if (response) {
            resolve(response)
          } else {
            reject(response)
          }
        })
        .catch((error) => {
          if (error) {
            reject(error)
          }
        })
    })
    const commonData = new Promise((resolve, reject) => {
      axios
        .get(`${apiCommonURL}`)
        .then((response) => {
          if (response) {
            resolve(response)
          } else {
            reject(response)
          }
        })
        .catch((error) => {
          if (error) {
            reject(error)
          }
        })
    })
    
    return Promise.all([storeData, commonData])
  }

}

const instance = new AppLoadAPI()

export default instance
