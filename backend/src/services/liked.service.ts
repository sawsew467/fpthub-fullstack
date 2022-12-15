import { EntityRepository, Repository } from "typeorm";
import { LikedPostEntity } from "@/entities/likedPost.entity";
import { PostEntity } from "@/entities/post.entity";
import { AccountEntity } from "@/entities/account.entity";
import DislikedPostService from "./disliked.service";

@EntityRepository()
class LikedService extends Repository<LikedPostEntity> {
    disLikedPostService = new DislikedPostService();

    //check current user is liked post or not
    public async isLiked(postID: number, currAccount: AccountEntity): Promise<boolean> {
        const data = await LikedPostEntity.findOne({
            where: {
                accountID: currAccount.id,
                postID
            }
        });       

        return data ? true : false;
    }

    //remove row with postId
    public async deleteLikedPost(postID: number): Promise<void> {
        const data = await LikedPostEntity.find({
            where: {
                postID
            }
        });

        await LikedPostEntity.remove(data);
    }

    //add currentUser and post id to table
    public async userLikePost(postID: number, accountID: number): Promise<void> {
        //find and delete in disliked table
        await this.disLikedPostService.findAndDelete(postID, accountID);
        await LikedPostEntity.create({ postID, accountID }).save();
    }

    public async userUnlikePost(postID: number, accountID: number): Promise<void> {
        const data = await LikedPostEntity.findOne({ where: { postID, accountID } });
        await LikedPostEntity.remove(data);
    }
}

export default LikedService;