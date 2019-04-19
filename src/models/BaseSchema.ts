import { Schema, SchemaDefinition, SchemaOptions } from 'mongoose';

class BaseSchema extends Schema {
  /**
   * Base Schema
   */
  constructor(definitions?: SchemaDefinition, schemaOptions?: SchemaOptions) {
    const defaultDefinition: SchemaDefinition = {
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    };

    super(
      { ...defaultDefinition, ...definitions },
      { ...schemaOptions },
    );
  }
}

export default BaseSchema;
