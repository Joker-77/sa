/* eslint-disable */
import api from "./Api";
export class OrdersService {
    static getAllOrders() {
        return api
            .get("/orders")
            .then((response) => {
                if (response && response.data) {
                    console.clear()
                    console.log(response)
                    return response.data;
                }
            });
    }
    static addOrder(payload) {
        return api.post("/orders", payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }
    static updateOrder(id, payload) {
        return api.post("/orders/edit/" + id, payload, {
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
    static deleteOrder(id) {
        return api.delete("/orders/" + id, null, {
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
    static changeStatus(id, payload) {
        return api.post(`/orders/${id}/change-status`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response && response.data) {
                console.log(response)
                return response.data;
            }
        });
    }
}

export default OrdersService;