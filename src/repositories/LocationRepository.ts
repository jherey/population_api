import BaseRepository from './BaseRepository';
import locationSchema, { Location } from '../models/LocationSchema';

class LocationRepository extends BaseRepository<Location> {
  constructor() {
    super('Location', locationSchema);
  }
}

export default LocationRepository;
