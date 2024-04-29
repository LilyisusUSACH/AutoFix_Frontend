import httpClient from "../http-common"

const getStatus = patenteValue => {
    return httpClient.get('/api/vehicle/patente/status', { params: { patente: patenteValue } });
}

export default {getStatus};