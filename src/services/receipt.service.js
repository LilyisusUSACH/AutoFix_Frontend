import httpClient from "../http-common";

const getReceipts = () => {
    return httpClient.get(`/api/receipt/`);
}

const getReceipt = (id) => {
    return httpClient.get(`/api/receipt/${id}`);
}

const getReceiptsByPatente = (patente) => {
    return httpClient.get(`/api/receipt/patente?patente=${patente}`)
}

const postCalculate = (id, bono, id_bono) => {
    if(id_bono!=null){
        return httpClient.post(`/api/receipt/id?id=${id}&bono=${bono}&bono_id=${id_bono}`);
    }
    return httpClient.post(`/api/receipt/id?id=${id}&bono=${bono}`);
}

const putReceipt = (id) => {
    return httpClient.put(`/api/receipt/?id=${id}`);
}

const getBonosByMarca = (marca) => {
    return httpClient.get(`/api/bono/marcaDisp?marca=${marca}`)
}

export default {
    getReceipt,
    getReceipts,
    getReceiptsByPatente,
    getBonosByMarca,
    postCalculate,
    putReceipt
};