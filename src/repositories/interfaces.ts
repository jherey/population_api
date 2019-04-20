import { Query } from 'mongoose';

export interface QueryOptions {
  select?: string;
  populate?: string;
  limit?: number;
  page?: number;
}

export interface PaginationOptions {
  limit: number;
  page: number;
}

export interface PaginatedModels<T> {
  total: number;
  perPage: number;
  page: number;
  pages: number;
  docs: T[];
}

export interface IRepository<T> {
  create(attrs: any): Promise<T>;
  findAll(query: QueryOptions, options: PaginationOptions): Promise<T[] | PaginatedModels<T>>;
  paginate(query: Query<T>, options: PaginationOptions): Promise<PaginatedModels<T>>;
  findById(id: string): Promise<T>;
  update(id: string, options: any): Promise<T>;
}