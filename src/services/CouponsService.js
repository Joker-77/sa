/* eslint-disable */
import api from "./Api";
export class CouponsService {
    static getAllCoupons() {
        return api
            .get("/coupon")
            .then((response) => {
                if (response && response.data) {
                    console.clear()
                    console.log(response)
                    return response.data;
                }
            });
    }
    static addCoupon(payload) {
        return api.post("/coupon", payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }
    static updateCoupon(id, payload) {
        return api.post("/coupon/edit/" + id , payload, {
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
    static deleteCoupon(id) {
        return api.delete("/coupon/delete/" + id , null, {
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
    static assignCouponToMarketer(id, assignee) {
        return api.post(`/coupon/${id}/assign`, {
            assignees: assignee
        }, {
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

export default CouponsService;