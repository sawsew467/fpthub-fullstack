import { EntityRepository, Repository } from "typeorm";
import { DislikedPostEntity } from "@/entities/dislikedPost.entity";
import { PostEntity } from "@/entities/post.entity";
import { AccountEntity } from "@/entities/account.entity";

@EntityRepository()
class DislikedPostService extends Repository<DislikedPostEntity> {
      //check current user is liked post or not
      public async isDisliked(postID: number, currAccount: AccountEntity): Promise<boolean> {
        const data = await DislikedPostEntity.findOne({
            where: {
                accountID: currAccount.id,
                postID
            }
        });       

        return data ? true : false;
    }

    //remove row with postId
    public async deleteDislikedPost(postID: number): Promise<void> {
        const data = await DislikedPostEntity.find({
            where: {
                postID
            }
        });

        await DislikedPostEntity.remove(data);
    }

    // find and delete accountID with postID
    public async findAndDelete(postID: number, accountID: number): Promise<void>{
        const data = await DislikedPostEntity.find({
            where: {
                postID,
                accountID
            }
        });
        if(data){
            DislikedPostEntity.remove(data);
        }
    }

    //create report with postID with accountID
    public async createReport(postID: number, accountID: number): Promise<void> {
        await DislikedPostEntity.create({postID, accountID}).save();
    }

}

export default DislikedPostService;