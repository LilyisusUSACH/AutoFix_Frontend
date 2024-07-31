import { stringify } from "querystring";

export function formatCurrency(amount: number | undefined): string {
    let formattedAmount = amount?.toFixed(0).toString();
    formattedAmount = '$' + formattedAmount?.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedAmount;
}

export function formatPhrase(phrase: string | undefined): string {
    return (phrase ?? "").replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
}

export function formatDateTime(dateTime :string): string{
    return dateTime.replace("T"," ").slice(0,19)
}