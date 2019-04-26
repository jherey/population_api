import { Model, model, Schema, Document, Query } from 'mongoose';
import { QueryOptions, IRepository, PaginationOptions, PaginatedModels } from './interfaces';

export default class BaseRepository<T extends Document> implements IRepository<T> {
  private name: string;
  protected model: Model<T>;

  constructor(name: string, schema: Schema) {
    this.name = name;
    this.model = model<T>(this.name, schema);
  }

  /**
   * @description Creates a new document
   * @param {object} options
   * @returns Returns a newly created document
   */
  async create(options: any): Promise<T> {
    try {
      const document = await this.model.create(options);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Paginate a model query
   * @param {Query<any>} query
   * @param {PaginationOptions} options
   * @returns Returns paginated documents
   */
  async paginate(query: Query<any>, options: PaginationOptions): Promise<PaginatedModels<T>> {
    try {
      const { limit, page } = options;
      const perPage = Number(limit);
      const total = await this.model.count(query);
      const offset = perPage * (page - 1);
      const pages = Math.ceil(total / perPage);
      const docs = await query.skip(offset).limit(perPage).exec();

      return { docs, total, perPage, page, pages };
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns all documents
   * @param {object} query Query options
   * @param {object} options Query options
   * @returns Returns an array of documents.
   */
  async findAll(query: any, options: QueryOptions): Promise<T[] | PaginatedModels<T>> {
    try {
      const { select, populate = '', limit, page = 1 } = options;
      const queryExec = this.model.find(query).populate(populate);

      queryExec.select(select);

      return limit
        ? await this.paginate(queryExec, { limit, page })
        : await queryExec.exec();

    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch document by id
   * @param {string} id Document id
   * @returns {Document} Resolves to found document.
   */
  async findById(id: string): Promise<T> {
    try {
      const document = await this.model.findOne({ _id: id }).exec();
      if (!document) throw new Error(`${this.name} not found`);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Update a document by id
   * @param {string} id
   * @param {any} options
   * @returns {Document} Updated document
   */
  async update(id: string, options: any): Promise<T> {
    try {
      const document = await this.model.findOneAndUpdate({ _id: id }, options, { new: true });
      if (!document) throw new Error(`${this.name} not found`);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Adds a string to an array
   * @param {object} query
   * @param {string} fieldToPushTo
   * @param {string} value
   * @returns {Document} Updated document
   */
   async pushToArray(query: any, fieldToPushTo: string, value: string): Promise<T> {
    try {
      const document = await this.model
        .findOneAndUpdate(query, { $addToSet: { [fieldToPushTo]: value } }, { new: true });
      if (!document) throw new Error(`${this.name} not found`);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Delete a document by id
   * @param {string} id
   * @returns {Document} Deleted document
   */
  async delete(id: string) {
    try {
      await this.model.deleteOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }
}