import httpClient from "../http-common"

const getBonos = () => {
    return httpClient.get('/recibos/bono/disp');
}

const getBonosByMarca = (marca) => {
    return httpClient.get(`/recibos/bono/marcaDisp?marca=${marca}`);
}

const getBonosUsados = () => {
    return httpClient.get('/recibos/bono/history');
}

const postNewBono = (data) => {
    return httpClient.post('/recibos/bono/',data);
}

export default {getBonos,getBonosByMarca, getBonosUsados, postNewBono};