import { NextFunction, Request, Response } from "express";
import AchievedService from "@/services/achieved.service";

class AchievedController {
    public achievedService = new AchievedService();

    public getRankOfMajor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const majorID: string = req.params.majorID;
            const listRankOfStudent = await this.achievedService.getRankStudentOfMajor(majorID);

            res.status(200).json({ data: listRankOfStudent, messages: 'find' });
        } catch (error) {
            next(error)
        }
    }
}

export default AchievedController;