import httpClient from "../http-common"

const getBonos = () => {
    return httpClient.get('/api/bono/disp');
}
const getBonosUsados = () => {
    return httpClient.get('/api/bono/');
}

const postNewBono = (data) => {
    return httpClient.post('/api/bono/',data);
}

export default {getBonos, getBonosUsados, postNewBono};