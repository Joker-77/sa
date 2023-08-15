/* eslint-disable */
import api from "./Api";
export class StoresService {
    static getAllStores() {
        return api
            .get("/store")
            .then((response) => {
                if (response && response.data) {
                    console.clear()
                    console.log(response)
                    return response.data;
                }
            });
    }
    static addStore(payload) {
        return api.post("/store", payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }
    static updateStore(id, payload) {
        return api.post("/store/edit/" + id , payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                console.log(response)
                return response.data;
            }
        });
    }
    static deleteStore(id) {
        return api.delete("/store/delete/" + id , null, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                console.log(response)
                return response.data;
            }
        });
    }
    static getAllCountries() {
        return api.get("/country").then((response) => {
            console.log(response);
            if (response && response.data) {
                return response.data;
            }
        });
      }
}

export default StoresService;