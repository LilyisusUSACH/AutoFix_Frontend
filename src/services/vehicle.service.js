import httpClient from "../http-common";

const getVehicleById = (id) => {
  return httpClient.get(`/api/vehicle/${id}`);
};

const getVehicleByPatente = (patente) => {
  return httpClient.get(`/api/vehicle/patente?patente=${patente}`);
};

const postNewVehicle = (data) => {
  return httpClient.post("/api/vehicle/", data);
};

export default { getVehicleById, getVehicleByPatente, postNewVehicle };
