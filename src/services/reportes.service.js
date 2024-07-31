import httpClient from "../http-common"

const getR1 = (month, year) => {
    return httpClient.get(`/reportes/1?month=${month}&year=${year}`);
}

const getR2 = (month, year) => {
    return httpClient.get(`/reportes/2?month=${month}&year=${year}`);
}

export default {getR1, getR2};