import { EModule } from "../../../enums/module.enum";
import { BaseDTO } from "../base/base.dto";

export interface ModuleGetDTO extends BaseDTO<EModule> {
  isActive: boolean;
  label: string;
  icon?: string;
  parentId?: EModule;

  items: ModuleGetDTO[];
}