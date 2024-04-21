import { Response } from './response';

export interface SkillResponse extends Response<SkillType> {}

export interface SkillResponses extends Response<SkillType[]> {}

export interface SkillType {
  name: string;
  percent: number;
  status: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SkillPayload {
  name: string;
  percent: number;
  status?: boolean;
}

export interface SkillUpdatePayload {
    name: string;
    percent: number;
    status?: boolean;
    _id: string;
}