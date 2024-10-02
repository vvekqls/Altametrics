import express from 'express';

import { getAllInvoices, getInvoiceById, getInvoiceTotal } from '../controllers/invoices';


export default (router: express.Router) => {
  router.get('/invoices', getAllInvoices);
  router.get('/invoices/total', getInvoiceTotal);
  router.get('/invoices/:id', getInvoiceById);
};