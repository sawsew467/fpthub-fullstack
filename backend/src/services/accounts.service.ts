import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateAccountDto } from '@/dtos/accounts.dto';
import { AccountEntity } from '@/entities/account.entity';
import { HttpException } from '@exceptions/HttpException';
import { Account } from '@/interfaces/accounts.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class AccountService extends Repository<AccountEntity> {
  public async findAllAccount(): Promise<AccountEntity[]> {
    const accounts: AccountEntity[] = await AccountEntity.find();
    return accounts;
  }

  public async findAccountById(accountID: number): Promise< Partial<Account> > {
    if (isEmpty(accountID)){
      throw new HttpException(400, "AccountID is empty");
    } 

    const findAccount: Account = await AccountEntity.findOne({ where: { accountID } });
    if (!findAccount) {
      throw new HttpException(409, "Account doesn't exist");
    } 
    
    return findAccount;
  }

  public async createAccount(accountData: CreateAccountDto): Promise<Account> {
    if (isEmpty(accountData)){
      throw new HttpException(400, "accountData is empty");
    } 

    const findAccount: Account = await AccountEntity.findOne({ where: { email: accountData.email } });
    if (findAccount) {
      throw new HttpException(409, `This email ${findAccount.email} already exists`);
    } 

    const hashedPassword = await hash(accountData.password, 10);
    const createAccount: Partial<Account> = {
      ...accountData,
      password: hashedPassword,
      studentName: accountData.fullname,
      follow: 0,
      role: 0,
      avatar: accountData.avatar
    }
    const createAccountData: Account = await AccountEntity.create(createAccount).save();

    return createAccountData;
  }

  public async updateAccount(accountID: number, accountData: CreateAccountDto): Promise<Account> {
    if (isEmpty(accountData)) {
      throw new HttpException(400, "accountData is empty");
    } 
    const findAccount: Account = await AccountEntity.findOne({ where: { accountID } });
    if (!findAccount) {
      throw new HttpException(409, "Account doesn't exist");
    }

    const hashedPassword = await hash(accountData.password, 10);
    await AccountEntity.update(accountID, { ...accountData, password: hashedPassword });

    const updateAccount: Account = await AccountEntity.findOne({ where: { accountID } });
    return updateAccount;
  }

  public async deleteAccount(accountID: number): Promise<Account> {
    if (isEmpty(accountID)) {
      throw new HttpException(400, "UserId is empty");
    } 

    const findAccount: Account = await AccountEntity.findOne({ where: { accountID } });
    if (!findAccount) {
      throw new HttpException(409, "Account doesn't exist");
    } 

    await AccountEntity.delete({ accountID });
    return findAccount;
  }
}

export default AccountService;
