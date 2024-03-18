import { Response } from './response';

export interface AuthResponse extends Response<AuthType> {}

export interface AuthType {
  access_token: string;
  role: string;
  token_type: string;
}

export interface AuthPayload {
  email: string;
  password: string;
}
