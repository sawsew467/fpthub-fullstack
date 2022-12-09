import { EntityRepository, Repository } from "typeorm";
import { AchievedEntity } from "@/entities/achieved.entity";
import { HttpException } from "@/exceptions/HttpException";
import { Achieved } from "@/interfaces/achieved.inteface";

@EntityRepository()
class AchievedService extends Repository<AchievedEntity> {
    public async getRankStudentOfMajor(majorID: string){
        const listRankOfStudent = await AchievedEntity.find({
            where: {
                majorID
            },
            order: {
                point: "DESC"
            }
        });

        
        return listRankOfStudent;
    }

    public async getAchievedOfStudent(accountID: number){
        const studentData = await AchievedEntity.findOne({ where: {accountID} });

        return studentData;
    }

    public async createAchievedOfUser(accountID: number, fullname: string, majorID: string){
        const achievedStudent = await AchievedEntity.create({ accountID, cocVang: 0, excellent: 0, fullname, good: 0, point: 0, majorID }).save();

        const { cocVang, excellent, good, point } = achievedStudent
        return { cocVang, excellent, good, point }
    }
}


export default AchievedService
