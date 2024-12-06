import { Router } from 'express';
import * as accountController from '../Controllers/accountController';
const router = Router();

router.get('/accounts', accountController.getAccounts);
router.post('/accounts', accountController.createAccount);
router.delete('/accounts/:id', accountController.deleteAccount);
router.put('/accounts/:id', accountController.updateAccount);

export default router;