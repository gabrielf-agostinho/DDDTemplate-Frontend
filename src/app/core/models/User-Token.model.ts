export interface UserToken {
  accessToken: string;
  createdAt: Date;
  expiresAt: Date;
  refreshToken?: string;
}