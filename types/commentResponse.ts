import { Response } from './response';

export interface CommentsResponse extends Response<Comment[]> {}
export interface CommentResponse extends Response<Comment> {}
export interface LikeResponse extends Response<Likes> {}
export interface LikesResponse extends Response<Likes[]> {}

interface Blog {
  slug: string;
  title: string;
}

export interface Comment {
  _id: string;
  blog: Blog;
  name: string;
  email: string;
  comment: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Likes{
  blog: string
  os: string
  browser: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}