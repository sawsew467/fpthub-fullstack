import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { AccountEntity } from '@/entities/account.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithAccount } from '@interfaces/auth.interface';

const authMiddleware = async (req: RequestWithAccount, res: Response, next: NextFunction) => {
  try {
    const Authorization = (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const { id } = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const findAccount = await AccountEntity.findOne(id, { select: ['id', 'email', 'password'] });

      if (findAccount) {
        req.account = findAccount;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
