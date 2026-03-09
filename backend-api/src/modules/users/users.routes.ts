import { Router } from 'express';
import { UserController } from './users.controller';
import { authMiddleware } from '../../middleware/auth';

const router = Router();
const userController = new UserController();

router.get('/profile', authMiddleware, (req, res) => userController.getProfile(req, res));
router.get('/balance', authMiddleware, (req, res) => userController.getBalance(req, res));
router.get('/', (req, res) => userController.getAllUsers(req, res));

export default router;
