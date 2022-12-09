import { NextFunction, Response } from "express";
import { HttpException } from "@/exceptions/HttpException";
import { RequestWithAccount } from "@/interfaces/auth.interface";
import { UserProfileEntity } from "@/entities/userProfile.entity";

const accessProfileMidleware = async (req: RequestWithAccount, res: Response, next: NextFunction) => {
    try {
        const profileID = Number(req.params.id);
        const profileData = await UserProfileEntity.findOne({ where: {id: profileID} });
        
        if(profileData.accountId != req.account.id){
            next(new HttpException(406, 'Can not allow to change user profile'))
        }
        next();
    } catch (error) {
        new HttpException(400, "Bad request")
    }
}

export default accessProfileMidleware;

//write function to check current user can access to update profile or not
