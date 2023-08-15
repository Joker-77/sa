/* eslint-disable */
import api from "./Api";
export class ProductsService {
    static getAllProducts() {
        return api
            .get("/products")
            .then((response) => {
                if (response && response.data) {
                    return response.data;
                }
            });
    }
    static getAllDamagedProducts() {
        return api
            .delete("/products/damaged_recored", null)
            .then((response) => {
                console.log(response)
                if (response && response.data) {
                    return response.data;
                }
            });
    }
    static addProduct(payload) {
        console.log(payload)
        return api.post("/products", payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }
    static updateProduct(id, payload) {
        console.log(payload)
        return api.post("/products/edit/" + id , payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }
    static damageProduct(id) {
        return api.delete("/products/damaged/" + id, null, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }
    static deleteProduct(id) {
        return api.delete("/products/delete/" + id, null, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }
    static restoreProduct(id) {
        return api.delete("/products/restore_damaged/" + id, null, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }
}

export default ProductsService;