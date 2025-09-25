import axios from './api';

// Számlák listázása
export async function getInvoices(token) {
    const response = await axios.get('/invoices', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

// Számla megnyitása PDF-ben, id alapján
export async function getInvoicePdf(invoiceId, token) {
    const response = await axios.get(`/invoices/${invoiceId}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
    });
    
    // Blob URL létrehozása
    const blob = new Blob([response.data], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
}

// Egy számla lekérése
export async function getInvoiceById(id, token) {
    const response = await axios.get(`/invoices/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

// Számla létrehozása
export async function createInvoice(invoiceData, token) {
    const response = await axios.post('/invoices', invoiceData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

// Saját számla lekérése
export async function getMyInvoices(token) {
    const response = await axios.get('/invoices/my', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}