import axios from "axios"
import Config from "../../config/config"

class AppLoadAPI {
    getStoresDetail = (apexDomain: string, include_children: boolean) => {
        const apiURL: string = `${Config.STORE_SERVICE_API_URL}dc/store/domain/${apexDomain}?include_children=${include_children}`
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
                        console.log("error response in get store details: ", error)
                    }
                })
        })
    }
}

const instance = new AppLoadAPI()

export default instance
