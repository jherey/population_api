import BaseSchema from './BaseSchema';
import { Document, SchemaTypes } from 'mongoose';
import { COMMON_SCHEMAS } from './common';

export interface Location extends Document {
  location: string;
  male: number;
  female: number;
  totalPopulation: number;
}

const locationSchema = new BaseSchema({
  location: COMMON_SCHEMAS.INDEXABLE_REQUIRED_STRING,
  male: COMMON_SCHEMAS.REQUIRED_NUMBER,
  female: COMMON_SCHEMAS.REQUIRED_NUMBER,
  totalPopulation: COMMON_SCHEMAS.REQUIRED_NUMBER,
  subLocations: [SchemaTypes.String]
});

export default locationSchema;
