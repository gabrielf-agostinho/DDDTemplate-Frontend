import { EResponseCodes } from "../enums/ResponseCodes.enum";

export interface Response<T> {
  success: boolean;
  data?: T;
  error?: string;
  code: EResponseCodes;
}