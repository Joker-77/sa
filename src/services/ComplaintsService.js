/* eslint-disable */
import api from "./Api";
export class ComplaintsService {
    static getAllComplaints() {
        return api
            .get("/complaint")
            .then((response) => {
                if (response && response.data) {
                    console.clear()
                    console.log(response)
                    return response.data;
                }   
            });
    }
    static deleteComplaint(id) {
        return api.delete("/complaint/" + id, null, {
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

export default ComplaintsService;