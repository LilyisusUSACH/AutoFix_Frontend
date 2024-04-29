import httpClient from "../http-common";

const getReparations = () => {
  return httpClient.get("/api/repair/");
};

const getActiveReparations = () => {
  return httpClient.get("/api/repair/actives");
};

const postNewReparation = (data) => {
  return httpClient.post("api/repair/", data);
};

const completeReparation = (id) => {
  return httpClient.put(`api/repair/${id}`);
};

const deleteReparation = (id) => {
  return httpClient.delete(`api/repair/${id}`);
};

export default {
    getReparations, 
    getActiveReparations, 
    postNewReparation,
    completeReparation,
    deleteReparation
};
