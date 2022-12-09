import { EntityRepository, Repository } from 'typeorm';
import { UserProfileEntity } from "@/entities/userProfile.entity";
import { HttpException } from "@/exceptions/HttpException";
import { UserProfile } from "@/interfaces/userProfile.interface";
import { isEmpty } from "@/utils/util";
import { CreateUserProfileDto, UpdateUserProfile } from '@/dtos/userProfile.dto';
import AchievedService from './achieved.service';

@EntityRepository()
class UserProfileService extends Repository<UserProfileEntity> {
    achievedService = new AchievedService();
    
    public async findUserProfileById(accountId: number) {
        if(isEmpty(accountId)){
            throw new HttpException(400, "UserprofileID is empty");
        }

        const findUserProfile = await UserProfileEntity.findOne({ where: { accountId } });
        if(!findUserProfile) {
            throw new HttpException(409, "userprofile doesn't exist");
        }

        //so luong bai post

        //Achievd of student
        const rank = await this.achievedService.getAchievedOfStudent(findUserProfile.accountId);
        const { cocVang, excellent, good, point } = rank;

        return {...findUserProfile, cocVang, excellent, good, point};
    }

    public async createUserProfile(userProfileData: CreateUserProfileDto): Promise<UserProfile> {
        if(isEmpty(userProfileData)) {
            throw new HttpException(400, 'userProfile is empty');
        }

        const findUserProfile: UserProfile = await UserProfileEntity.findOne({ 
            where: {
                accountId: userProfileData.accountId
            }
         })
        if(findUserProfile) {
            throw new HttpException(409, `Userprofile already exist`);
        }
        const data: Partial<UserProfile> = { ...userProfileData };
        const createUserProfileData: UserProfile = await UserProfileEntity.create(data).save();

        const achievedStudent = await this.achievedService.createAchievedOfUser(userProfileData.accountId, userProfileData.fullname, userProfileData.majorID);
        return {...createUserProfileData, ...achievedStudent};
    }

    public async updateUserProfile(profileID: number, userProfileData: UpdateUserProfile): Promise<UserProfile> {
        if(isEmpty(userProfileData)) {
            throw new HttpException(400, 'userProfile data is empty');
        }
        const findUserProfile = await UserProfileEntity.findOne({ where: {id: profileID} });
        if(!findUserProfile) {
            throw new HttpException(409, "UserProfile doesn't exist");
        }
        await UserProfileEntity.update(profileID, { ...userProfileData });
        const updateUserProfile: UserProfile = await UserProfileEntity.findOne({ where: { id: profileID } });

        return updateUserProfile;
    }
}

export default UserProfileService