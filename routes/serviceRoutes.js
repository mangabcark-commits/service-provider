import express from 'express';
import { getCities, getServiceDetails, getServices, getWorkerDetails } from '../controllers/serviceController.js';

const router = express.Router();

router.get('/cities', getCities);
router.get('/', getServices);
router.get('/:serviceId', getServiceDetails);
router.get('/:serviceId/workers/:workerId', getWorkerDetails);

export default router;
