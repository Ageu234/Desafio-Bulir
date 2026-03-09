import { Router } from 'express';
import { ServiceController } from './services.controller';
import { authMiddleware, roleMiddleware } from '../../middleware/auth';

const router = Router();
const serviceController = new ServiceController();

router.post('/', authMiddleware, roleMiddleware(['SERVICE_PROVIDER']), (req, res) =>
  serviceController.create(req, res),
);
router.get('/', (req, res) => serviceController.getAll(req, res));
router.get('/provider/my-services', authMiddleware, (req, res) =>
  serviceController.getByProvider(req, res),
);
router.get('/:id', (req, res) => serviceController.getById(req, res));
router.put('/:id', authMiddleware, roleMiddleware(['SERVICE_PROVIDER']), (req, res) =>
  serviceController.update(req, res),
);
router.delete('/:id', authMiddleware, roleMiddleware(['SERVICE_PROVIDER']), (req, res) =>
  serviceController.delete(req, res),
);

export default router;
