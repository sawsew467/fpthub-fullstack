import { EntityRepository, Repository } from "typeorm";
import { LikedPostEntity } from "@/entities/likedPost.entity";
import { PostEntity } from "@/entities/post.entity";
import { AccountEntity } from "@/entities/account.entity";

@EntityRepository()
class LikedService extends Repository<LikedPostEntity> {
    //check current user is liked post or not
    public async isLiked(post: PostEntity, currAccount: AccountEntity): Promise<boolean> {
        const data = await LikedPostEntity.findOne({
            where: {
                accountID: currAccount.id,
                postID: post.id
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
}

export default LikedService;