import { BaseDTO } from "./base.dto";

export interface EnumDTO extends BaseDTO<number> {
  description: string;
}