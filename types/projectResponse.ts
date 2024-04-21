import { Response } from './response';

export interface ProjectsResponse extends Response<Project[]> {}
export interface ProjectResponse extends Response<Project> {}

export interface Project {
  title: string;
  description: string;
  category: string;
  image: string;
  url: string;
  status: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProjectPayload {
    title: string;
    description: string;
    category: string;
    image: string | Blob |File;
    url: string;
}