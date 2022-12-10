import { Router } from 'express';
import AchievedController from '@/controllers/achieved.controller';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';

class AchievedRoute implements Routes {
    public path = '/achieved';
    public router: Router = Router();
    public achievedController = new AchievedController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(authMiddleware);
        this.router.get(`${this.path}/:majorID`, this.achievedController.getRankOfMajor);
    }
}

export default AchievedRoute;