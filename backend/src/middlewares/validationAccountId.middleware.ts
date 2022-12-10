import { NextFunction, Response, Request } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import { AccountEntity } from '@/entities/account.entity';

const validationAccountId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accountId = Number(req.params.accountId);
        const accountData = await AccountEntity.findOne({ where: { id: accountId } });
        if(!accountData) {
            next(new HttpException(404, 'can not found account id'));
        }
        next();
    } catch (error) {
        new HttpException(400, "Bad request")
    }
}

export default validationAccountId