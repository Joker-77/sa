/* eslint-disable */
import api from "./Api";
export class StudentsService {
  static getAllStudents() {
    return api.get("/products").then((response) => {
      if (response && response.data) {
        return response.data;
      }
    });
  }
  static addStudent(payload) {
    console.log(payload);
    return api
      .post("/products", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response && response.data) {
          return response.data;
        }
      });
  }
  static updateStudent(id, payload) {
    console.log(payload);
    return api
      .post("/products/edit/" + id, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response && response.data) {
          return response.data;
        }
      });
  }
  static deleteStudent(id) {
    return api
      .delete("/products/delete/" + id, null, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response && response.data) {
          return response.data;
        }
      });
  }
  static restoreStudent(id) {
    return api
      .delete("/products/restore_damaged/" + id, null, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response && response.data) {
          return response.data;
        }
      });
  }
}

export default StudentsService;
