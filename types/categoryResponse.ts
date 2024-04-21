import { Response } from './response';

export interface CategoryResponses extends Response<CategoryType[]> {}

export interface CategoryType {
  _id: string;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoryPayload {
  name: string;
  status?: boolean;
}