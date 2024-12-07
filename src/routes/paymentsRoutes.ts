/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @stylistic/ts/semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable n/no-process-env */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { executePayment } from '../Controllers/paymentsController';
import { ValidatePayment } from '../middleware/validatePayment';

const router = express.Router();

router.post('/execute', ValidatePayment, executePayment);

export default router;
