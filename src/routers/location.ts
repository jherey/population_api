import { Router } from 'express';
import LocationsController from '../controllers/LocationsController';
import { createLocation } from '../middlewares/validateUserInputs';

const router = Router();

router.post('/',
  createLocation,
  LocationsController.createLocation);

export default router;
