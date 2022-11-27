import { Request } from 'express';
import { RequestAccount } from '@/interfaces/accounts.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  account: RequestAccount;
}
