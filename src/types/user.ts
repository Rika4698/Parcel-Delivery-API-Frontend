export type UserRole = 'ADMIN' | 'SENDER' | 'RECEIVER';
export type UserActiveStatus = 'ACTIVE' | 'INACTIVE';
export type AuthProvider = 'Email' | 'Google' | 'Github' | 'Facebook' | 'Apple';

export interface UserAuth {
  provider: AuthProvider;
  providerId: string; 
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string
  password: string;
  role: UserRole; 
  isDeleted: boolean;
  isActive: UserActiveStatus; 
  isVerified: boolean;

  auths: UserAuth[]; 

  Parcels: string[];

  createdAt: string | Date;
  updatedAt: string | Date;

  picture?: string;
  address?: string; 
}

export interface IMessages {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string; 
  updatedAt: string; 
  __v?: number;
}
