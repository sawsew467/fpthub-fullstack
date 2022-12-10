import { Router } from 'express';
import UserProfilesController from '@/controllers/userProfiles.controller';
import { CreateUserProfileDto, UpdateUserProfile } from '@/dtos/userProfile.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import accessProfileMidleware from '@/middlewares/accessProfile.middleware';

class UserProfileRoute implements Routes {
    public path = '/userprofile';
    public router = Router();
    public userProfilesController = new UserProfilesController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(authMiddleware);
        this.router.get(`${this.path}/:id`, this.userProfilesController.getUserProfile);
        this.router.post(`${this.path}`, validationMiddleware(CreateUserProfileDto),this.userProfilesController.createUserProfile);
        this.router.post(`${this.path}/update/:id`, accessProfileMidleware, validationMiddleware(UpdateUserProfile), this.userProfilesController.updateUserProfile);
    }
}

export default UserProfileRoute;