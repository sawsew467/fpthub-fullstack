import { NextFunction, Request, Response } from 'express';
import { CreateAccountDto, ReturnAccountDto } from '@/dtos/accounts.dto';
import { RequestWithAccount } from '@interfaces/auth.interface';
import { Account } from '@/interfaces/accounts.interface';
import AuthService from '@services/auth.service';
import { plainClass } from '@/utils/plainClass';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accountData: CreateAccountDto = req.body;
      let signUpAccountData: Partial<Account> = await this.authService.signup(accountData);
      signUpAccountData = plainClass(ReturnAccountDto, signUpAccountData);

      res.status(201).json({ data: signUpAccountData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accountData: CreateAccountDto = req.body;
      let { cookie, findAccount } = await this.authService.login(accountData);
      findAccount = plainClass(ReturnAccountDto, findAccount);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findAccount, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accountData: Account = req.account;
      let logOutUserData: Partial<Account> = await this.authService.logout(accountData);
      logOutUserData = plainClass(ReturnAccountDto, logOutUserData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
