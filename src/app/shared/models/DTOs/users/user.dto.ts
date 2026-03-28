import { CommonGetDTO, CommonPostDTO, CommonPutDTO } from "../Base/common.dto";

export interface UserGetDTO extends CommonGetDTO<string> {
  name: string;
  email: string;
}

export interface UserPostDTO extends CommonPostDTO {
  name: string;
  email: string;
  password: string;
}

export interface UserPutDTO extends CommonPutDTO<string> {
  name: string;
  email: string;
}