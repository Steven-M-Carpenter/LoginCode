import axios from "axios";

export default {

   // Search Google Books for the term provided 
  getUser: (query) => {
    return axios.post("/api/signin", query);
  },
  createUser: (query) => {
    return axios.post("/api/signup", query);
  },
  checkAuth: function(query) {
    console.log("Quer in API = " + JSON.stringify(query));
    return axios.post("/api/verify", query);
  }
};
