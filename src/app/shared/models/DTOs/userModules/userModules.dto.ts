import { IAuditable } from "../../../interfaces/DTOs/Base/IAuditable.dto";
import { IUserTrackable } from "../../../interfaces/DTOs/Base/IUserTrackable.dto";
import { BaseDTO } from "../base/base.dto";

export interface UserModulesGetDTO extends BaseDTO<number>, IAuditable, IUserTrackable<string> {
  userId: string;
  moduleId: number;
  insert: boolean;
  update: boolean;
  delete: boolean;
}

export interface UserModulesPostDTO {
  userId: string;
  moduleId: number;
  insert: boolean;
  update: boolean;
  delete: boolean;
}

export interface UserModulesPutDTO extends BaseDTO<number> {
  userId: string;
  moduleId: number;
  insert: boolean;
  update: boolean;
  delete: boolean;
}