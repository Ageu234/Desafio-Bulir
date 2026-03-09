import { Router } from 'express';
import { ReservationController } from './reservations.controller';
import { authMiddleware, roleMiddleware } from '../../middleware/auth';

const router = Router();
const reservationController = new ReservationController();

router.post('/', authMiddleware, roleMiddleware(['CLIENT']), (req, res) =>
  reservationController.create(req, res),
);
router.delete('/:id', authMiddleware, (req, res) =>
  reservationController.delete(req, res),
);
router.get('/history/my-history', authMiddleware, (req, res) =>
  reservationController.getHistory(req, res),
);
router.get('/', (req, res) => reservationController.getAll(req, res));

export default router;
