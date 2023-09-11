/* eslint-disable */
import api from "./Api";
export class SlidersService {
    static getAllSliders() {
        return api
            .get("/slider")
            .then((response) => {
                if (response && response.data) {
                    console.clear()
                    console.log(response)
                    return response.data;
                }
            });
    }
    static addSlider(payload) {
        return api.post("/slider", payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }
    static updateSlider(id, payload) {
        return api.post("/slider/edit/" + id , payload, {
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
    static deleteSlider(id) {
        return api.delete("/slider/delete/" + id , null, {
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
}

export default SlidersService;