import { Request, Response } from 'express';
import LocationService from '../services/LocationService';

class LocationsController {
  static async createLocation(req: Request, res: Response) {
    try {
      const newLocation = await LocationService.saveNewLocation(req.body);
      return res.status(201).json({ message: 'New location created', newLocation });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async listLocations(req: Request, res: Response) {
    try {
      const { limit, page } = req.query;
      const locations = await LocationService.getAllLocations({ limit, page });
      return res.status(200).json(locations);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default LocationsController;
