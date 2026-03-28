export interface IUserTrackable<TId> {
  createdBy?: TId;
  updatedBy?: TId;
}