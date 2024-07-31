import httpClient from "../http-common";

const getVehicles = () => {
  return httpClient.get(`/vehiculos/`);
};

const getVehicleById = (id) => {
  return httpClient.get(`/vehiculos/${id}`);
};

const getVehicleByPatente = (patente) => {
  return httpClient.get(`/vehiculos/ByPatente?patente=${patente}`);
};

const postNewVehicle = (data) => {
  return httpClient.post("/vehiculos/", data);
};

export default {getVehicles, getVehicleById, getVehicleByPatente, postNewVehicle };
