import { SchemaTypes } from 'mongoose';

export namespace COMMON_SCHEMAS {
  export const INDEXABLE_REQUIRED_STRING = {
    type: SchemaTypes.String,
    required: true,
    index: true
  };

  export const REQUIRED_NUMBER = {
    type: SchemaTypes.Number,
    trim: true,
    required: true,
  };
}