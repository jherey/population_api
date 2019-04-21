import { Router } from 'express';
import LocationsController from '../controllers/LocationsController';
import { createLocation, updateLocation } from '../middlewares/validateUserInputs';
import validLocation from '../middlewares/verifyLocation';

const router = Router();

router.post('/',
  createLocation,
  LocationsController.createLocation);

router.get('/',
  LocationsController.listLocations);

router.put('/:id',
  updateLocation,
  validLocation,
  LocationsController.updateLocation);

router.delete('/:id',
  validLocation,
  LocationsController.deleteLocation);
export default router;
