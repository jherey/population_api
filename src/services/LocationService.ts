import LocationRepository from '../repositories/LocationRepository';
import { NewLocation } from './interfaces';
import { QueryOptions } from '../repositories/interfaces';

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

  static async getAllLocations(options: QueryOptions) {
    try {
      const locations = await locationRepository.findAll({}, options);

      return locations;
    } catch (error) {
      throw error;
    }
  }
}