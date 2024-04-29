import httpClient from "../http-common"

const getR1 = () => {
    return httpClient.get('/api/reportes/r1');
}

const getR2 = () => {
    return httpClient.get('/api/reportes/r2');
}

const getR3 = () => {
    return httpClient.get('/api/reportes/r3');
}

const getR4 = () => {
    return httpClient.get('/api/reportes/r4');
}


export default {getR1, getR2, getR3, getR4};