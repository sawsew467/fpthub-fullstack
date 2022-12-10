import { EntityRepository, Repository } from "typeorm";
import { DislikedPostEntity } from "@/entities/dislikedPost.entity";
import { PostEntity } from "@/entities/post.entity";
import { AccountEntity } from "@/entities/account.entity";

@EntityRepository()
class DislikedPostService extends Repository<DislikedPostEntity> {
      //check current user is liked post or not
      public async isDisliked(post: PostEntity, currAccount: AccountEntity): Promise<boolean> {
        const data = await DislikedPostEntity.findOne({
            where: {
                accountID: currAccount.id,
                postID: post.id
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

}

export default DislikedPostService;