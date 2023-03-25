export type TUser = {
  accessToken: string;
  createdAt: number;
  creationTime: number;
  email: string;
  emailVerified: boolean;
  expires?: number;
  firstName?: string;
  isExpired?: boolean;
  isRegistered: boolean;
  lastName?: string;
  lastSigninTime: number;
  lastLoginAt: number;
  paid: boolean;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  refreshToken: string;
  uid: string;
};
