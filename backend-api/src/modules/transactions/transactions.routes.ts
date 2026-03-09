import { Router } from 'express';
import { TransactionController } from './transactions.controller';
import { authMiddleware } from '../../middleware/auth';

const router = Router();
const transactionController = new TransactionController();

router.get('/', (req, res) => transactionController.getAll(req, res));
router.get('/user/my-transactions', authMiddleware, (req, res) =>
  transactionController.getByUser(req, res),
);
router.get('/:id', (req, res) => transactionController.getById(req, res));

export default router;
