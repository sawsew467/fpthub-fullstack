import { EntityRepository, Repository } from 'typeorm';
import { UserProfileEntity } from "@/entities/userProfile.entity";
import { HttpException } from "@/exceptions/HttpException";
import { UserProfile } from "@/interfaces/userProfile.interface";
import { isEmpty } from "@/utils/util";
import { CreateUserProfileDto, UpdateUserProfile } from '@/dtos/userProfile.dto';

@EntityRepository()
class UserProfileService extends Repository<UserProfileEntity> {

    public async findUserProfileById(profileID: number): Promise<UserProfile> {
        if(isEmpty(profileID)){
            throw new HttpException(400, "UserprofileID is empty");
        }

        const findUserProfile = await UserProfileEntity.findOne({ where: { id: profileID } });
        if(!findUserProfile) {
            throw new HttpException(409, "userprofile doesn't exist");
        }

        return findUserProfile;
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

        return createUserProfileData;
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