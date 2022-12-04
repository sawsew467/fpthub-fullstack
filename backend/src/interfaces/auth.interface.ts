import { Request } from 'express';
import { Account } from './accounts.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithAccount extends Request {
  account: Account;
}
