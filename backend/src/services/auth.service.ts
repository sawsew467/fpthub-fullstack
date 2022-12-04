import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { EntityRepository, Repository } from 'typeorm';
import { SECRET_KEY } from '@config';
import { CreateAccountDto } from '@/dtos/accounts.dto';
import { AccountEntity } from '@/entities/account.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Account } from '@/interfaces/accounts.interface';
import { isEmpty } from '@utils/util';
import AccountService from './accounts.service';

@EntityRepository()
class AuthService extends Repository<AccountEntity> {
  private accountService: AccountService = new AccountService();

  public async signup(accountData: CreateAccountDto): Promise< Partial<Account> > {
    const createAccountData = await this.accountService.createAccount(accountData);
    return createAccountData;
  }

  public async login(accountData: CreateAccountDto): Promise<{ cookie: string; findAccount: Partial<Account>, token: string }> {
    if (isEmpty(accountData)) throw new HttpException(400, "account data is empty");

    const findAccount: Account = await this.accountService.findAccountByEmail(accountData.email);
   
    const isPasswordMatching: boolean = await compare(accountData.password, findAccount.password);
    if (!isPasswordMatching) throw new HttpException(409, "Password not matching");

    const tokenData = this.createToken(findAccount);
    const cookie = this.createCookie(tokenData);

    return { cookie, findAccount, token: tokenData.token };
  }

  public async logout(accountData: Account): Promise<Account> {
    if (isEmpty(accountData)) throw new HttpException(400, "account data is empty");

    const findAccount: Account = await AccountEntity.findOne({ where: { email: accountData.email, password: accountData.password } });
    if (!findAccount) throw new HttpException(409, "User doesn't exist");

    return findAccount;
  }

  public createToken(account: Partial<Account>): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: account.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
