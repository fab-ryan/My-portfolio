import { Response } from './response';

export interface QueriesResponse extends Response<Queries[]> {}

export interface QueryResponse extends Response<Queries> {}
export interface Queries {
  name: string;
  email: string;
  message: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
