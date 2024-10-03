import express from 'express';
import { paginate } from '../middlewares/paginate';
import { getAllInvoices, getInvoiceById, getInvoiceTotal } from '../controllers/invoices';


export default (router: express.Router) => {
  router.get('/invoices', paginate(), getAllInvoices);
  router.get('/invoices/total', getInvoiceTotal);
  router.get('/invoices/:id', getInvoiceById);
};
