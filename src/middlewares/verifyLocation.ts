import { Request, Response } from 'express';
import LocationRepository from '../repositories/LocationRepository';

const locationRepository = new LocationRepository();

const validLocation = async (req: Request, res: Response, next: any) => {
  try {
    const { id } = req.params;
    await locationRepository.findById(id);
    next();
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export default validLocation;
