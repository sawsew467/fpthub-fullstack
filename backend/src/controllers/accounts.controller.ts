import { NextFunction, Request, Response } from 'express';
import { CreateAccountDto, ReturnAccountDto } from '@/dtos/accounts.dto';
import { Account } from '@/interfaces/accounts.interface';
import AccountService from '@/services/accounts.service';
import { plainClass } from '@/utils/plainClass';

class AccountsController {
  public accountService = new AccountService();

  public getAccounts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllAccountsData: Partial<Account>[] = await this.accountService.findAllAccount();

      for (const account of findAllAccountsData) {
          const  newAccount = plainClass(ReturnAccountDto, account) as Partial<Account>;
          const index = findAllAccountsData.indexOf(account);
          findAllAccountsData[index] = newAccount;
      }
      res.status(200).json({ data: findAllAccountsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAccountById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accountID = Number(req.params.id);
      let findOneAccountData: Partial<Account> = await this.accountService.findAccountById(accountID);

      findOneAccountData = plainClass(ReturnAccountDto, findOneAccountData);
      res.status(200).json({ data: findOneAccountData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accountData: CreateAccountDto = req.body;
      let createAccountData: Account = await this.accountService.createAccount(accountData);

      createAccountData = plainClass(ReturnAccountDto, createAccountData);
      
      res.status(201).json({ data: createAccountData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accountId = Number(req.params.id);
      const accountData: CreateAccountDto = req.body;
      let updateAccountData: Account = await this.accountService.updateAccount(accountId, accountData);

      updateAccountData = plainClass(ReturnAccountDto, updateAccountData);
      
      res.status(200).json({ data: updateAccountData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accountID = Number(req.params.id);
      let deleteAccountData: Account = await this.accountService.deleteAccount(accountID);

      deleteAccountData = plainClass(ReturnAccountDto, deleteAccountData)
      res.status(200).json({ data: deleteAccountData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AccountsController;
