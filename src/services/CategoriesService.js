/* eslint-disable */
import api from "./Api";
export class CategoriesService {
    static getAllCategories() {
        return api
            .get("/category")
            .then((response) => {
                if (response && response.data) {
                    console.clear()
                    console.log(response)
                    return response.data;
                }   
            });
    }
    static addCategory(payload) {
        console.log(payload)
        return api.post("/category", payload, {
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
    static updateCategory(id, payload) {
        console.log(payload)
        return api.post("/category/edit/" + id , payload, {
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
    static deleteCategory(id) {
        return api.delete("/category/delete/" + id, null, {
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

export default CategoriesService;