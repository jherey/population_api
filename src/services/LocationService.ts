import LocationRepository from '../repositories/LocationRepository';
import { NewLocation } from './interfaces';

const locationRepository = new LocationRepository();

export default class LocationService {
  static async saveNewLocation(locationData: NewLocation) {
    try {
      const { male, female } = locationData;
      locationData.totalPopulation = Number(male) + Number(female);
      const newLocation = await locationRepository.create(locationData);

      return newLocation;
    } catch (error) {
      throw error;
    }
  }
}