/* eslint-disable */
import api from "./Api";
export class UsersService {
    static getAllUsers() {
        return api
            .get("/users")
            .then((response) => {
                if (response && response.data) {
                    console.clear()
                    console.log(response)
                    return response.data;
                }
            });
    }
    static getAllClients() {
        return api
            .get("/client")
            .then((response) => {
                if (response && response.data) {
                    console.clear()
                    console.log(response)
                    return response.data;
                }
            });
    }
    static getAllMarketers() {
        return api
            .get("/Marketer")
            .then((response) => {
                if (response && response.data) {
                    console.clear()
                    console.log(response)
                    return response.data;
                }
            });
    }
    static addUser(payload) {
        return api.post("/users", payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }
    static updateUser(id, payload) {
        return api.post("/users/edit/" + id , payload, {
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
    static deleteUser(id) {
        return api.delete("/users/delete/" + id , null, {
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

export default UsersService;