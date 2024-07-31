import httpClient from "../http-common";
import { Receipt } from "../types/types";

const getReceipts = () => {
    return httpClient.get(`/recibos/receipt/`);
}

const getReceipt = (id:string) => {
    return httpClient.get<Receipt>(`/recibos/receipt/${id}`);
}

const getReceiptsByPatente = (patente:string) => {
    return httpClient.get(`/recibos/receipt/byPatente?patente=${patente}`)
}

const postCalculate = (id:string, id_bono:number) => {
    if(id_bono!=null){
        return httpClient.post(`/recibos/receipt/calc/${id}?id_bono=${id_bono}`);
    }
    return httpClient.post(`/recibos/receipt/calc/${id}`);
}

const putReceipt = (id:string) => {
    return httpClient.put(`/recibos/receipt/${id}`);
}

const getFinalDetails = (id:string) => {
    return httpClient.get(`/recibos/details/${id}`)
}

export default {
    getReceipt,
    getReceipts,
    getFinalDetails,
    getReceiptsByPatente,
    postCalculate,
    putReceipt
};