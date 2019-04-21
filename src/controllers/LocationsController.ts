import { Request, Response } from 'express';
import LocationService from '../services/LocationService';

class LocationsController {
  static async createLocation(req: Request, res: Response) {
    try {
      const newLocation = await LocationService.saveNewLocation(req.body);
      return res.status(201).json({ message: 'New location created', newLocation });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async listLocations(req: Request, res: Response) {
    try {
      const { limit, page } = req.query;
      const locations = await LocationService.getAllLocations({ limit, page });
      return res.status(200).json(locations);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateLocation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedLocation = await LocationService.updateALocation(id, req.body);
      return res.status(200).json({ updatedLocation });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteLocation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await LocationService.deleteALocation(id);
      return res.status(200).json({ message: 'Location deleted' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default LocationsController;
