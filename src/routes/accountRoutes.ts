import { Router } from 'express';
import * as accountController from '../Controllers/accountController';
const router = Router();

router.get('/getAccounts', accountController.getAccounts);

export default router;