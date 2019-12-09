import axios from "axios";
import qs from "qs";

function readGroups(url, token, success, failure) {
  axios({
    method: "GET",
    url: url + "users/usergroupstest",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (success !== null) {
        success(response);
      }
    })
    .catch(err => {
      if (failure !== null) {
        failure(err);
      }
    });
}

function getAssignedStores(url, token, success, failure) {
  axios({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    url: url + "stores/assignedstores"
  })
    .then(response => {
      if (success !== null) {
        success(response);
      }
    })
    .catch(err => {
      if (failure !== null) {
        failure(err);
      }
    });
}

export { readGroups, getAssignedStores };
