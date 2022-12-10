import { NextFunction, Request, Response } from "express";
import { CreateUserProfileDto, UpdateUserProfile } from "@/dtos/userProfile.dto";
import { UserProfile } from "@/interfaces/userProfile.interface";
import UserProfileService from "@/services/userProfile.service";

class UserProfilesController {
    public userProfileService = new UserProfileService();

// user profile
// thông tin cá nhân
// Số lượng bái post của người đó
// danh hiệu

    public getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const accountId: number = Number(req.params.id);
            const findUserProfileData: UserProfile = await this.userProfileService.findUserProfileById(accountId);
            res.status(200).json({ data: findUserProfileData, messages: 'findOne' });
        } catch (error) {
            next(error);
        }
    }

    public createUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userProfileData: CreateUserProfileDto = req.body;
            let createUserProfileData: UserProfile = await this.userProfileService.createUserProfile(userProfileData);
            res.status(201).json({ data: createUserProfileData, message: 'created' });
        } catch (error) {
            next(error);
        }
    }

    public updateUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const profileID: number = Number(req.params.id);
            const userProfileData: UpdateUserProfile = req.body;
            let updateUserProfile: UserProfile = await this.userProfileService.updateUserProfile(profileID, userProfileData);
            res.status(200).json({ data: updateUserProfile, message: 'updated' });
        } catch (error) {
            next(error);
        }
    }
}

export default UserProfilesController;