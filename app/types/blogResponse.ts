import { Response } from './response';

export interface BlogResponses extends Response<BlogType[]> {}
export interface BlogResponse extends Response<BlogType> {}

export interface BlogType {
  _id: string;
  slug: string;
  title: string;
  preview: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  comments: string[];
  status: boolean;
  likes: string[];
}

export interface BlogPayload {
  title: string;
  content: string;
  image: string | Blob | File;
  description: string;
}
export interface BlogUpdatePayload extends BlogPayload {
  slug: string;
}

export interface BlogCreateResponse extends Response<BlogType>{
  
}