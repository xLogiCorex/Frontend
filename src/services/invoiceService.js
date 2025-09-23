import axios from './api';

export async function getInvoices(token) {
    const response = await axios.get('/invoices', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

export async function getInvoicePdf(invoiceId, token) {
    const response = await axios.get(`/invoices/${invoiceId}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob' // Fontos a blob response-hoz
    });
    
    // Blob URL létrehozása
    const blob = new Blob([response.data], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
}

export async function createInvoice(invoiceData, token) {
    const response = await axios.post('/invoices', invoiceData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}