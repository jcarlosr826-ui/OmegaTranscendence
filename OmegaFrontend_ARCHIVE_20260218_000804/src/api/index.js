import axios from 'axios';


const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});


// Auth
export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (email, password) => api.post('/auth/register', { email, password });


// Store Scraper
export const scrapeStore = (url) => api.post('/scraper/store', { url });


// AI Credit Repair
export const generateDisputeLetter = (reportItem, reason) =>
  api.post('/credit/repair', { reportItem, disputeReason: reason });


export default api;
