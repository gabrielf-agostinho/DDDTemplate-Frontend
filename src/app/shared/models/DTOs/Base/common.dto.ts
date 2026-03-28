import { IActivatable } from "../../../interfaces/DTOs/Base/IActivatable.dto";
import { IAuditable } from "../../../interfaces/DTOs/Base/IAuditable.dto";
import { ISoftDelete } from "../../../interfaces/DTOs/Base/ISoftDelete.dto";
import { IUserTrackable } from "../../../interfaces/DTOs/Base/IUserTrackable.dto";
import { BaseDTO } from "./base.dto";

export interface CommonGetDTO<TId> extends BaseDTO<TId>, IActivatable, IAuditable, IUserTrackable<TId>, ISoftDelete {

}

export interface CommonPostDTO extends IActivatable {

}

export interface CommonPutDTO<TId> extends BaseDTO<TId>, IActivatable {

}