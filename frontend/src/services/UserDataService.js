import http from "../http-common";

class TutorialDataService {
  getAllUsers() {
    return http.get("/users");
  }

  signup(data) {
    return http.post("/signup", data);
  }

  login(id, data) {
    return http.put("/login", data);
  }

  deleteUser() {
    return http.delete(`/:id`);
  }
}

export default new TutorialDataService();