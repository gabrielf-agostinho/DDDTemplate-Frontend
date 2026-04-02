import { EModule } from "../../../enums/module.enum";
import { IAuditable } from "../../../interfaces/DTOs/Base/IAuditable.dto";
import { IUserTrackable } from "../../../interfaces/DTOs/Base/IUserTrackable.dto";
import { BaseDTO } from "../base/base.dto";

export interface ModuleGetDTO extends BaseDTO<number>, IAuditable, IUserTrackable<string> {
  userId: string;
  moduleId: EModule
  insert: boolean;
  update: boolean;
  delete: boolean;
}