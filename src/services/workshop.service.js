import httpClient from "../http-common";

const getListReps = () => {
  return httpClient.get("/reparaciones/");
};

const getReparations = () => {
  return httpClient.get("/recibos/reparation/");
};

const getActiveReparations = () => {
  return httpClient.get("/recibos/reparation/onwork");
};

const getReparationsByDate = (year, month) => {
  return httpClient.get(`/recibos/reparation/byDate?year=${year}&month=${month}`)
}

const postNewReparation = (data) => {
  return httpClient.post("/recibos/receipt/repair/", data);
};

const completeReparation = (id) => {
  return httpClient.put(`/recibos/reparation/${id}`);
};

const deleteReparation = (id) => {
  return httpClient.delete(`/recibos/reparation/${id}`);
};

export default {
    getReparations, 
    getActiveReparations, 
    postNewReparation,
    completeReparation,
    deleteReparation,
    getReparationsByDate,
    getListReps
};
