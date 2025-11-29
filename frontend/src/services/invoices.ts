import { api } from "./api";

export const getInvoices = async () => {
    const res = await api.get("/invoices");
    return res.data;
};

export const getInvoiceById = async (id: string) => {
    const res = await api.get(`/invoices/${id}`);
    return res.data;
};