import express from 'express';
import authentication from './authentication';
import invoices from './invoices';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  invoices(router)
  return router;
};