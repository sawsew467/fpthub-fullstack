import { EntityRepository, Repository } from "typeorm";
import { SavedPostEntity } from "@/entities/savedPost.entity";
import { PostEntity } from "@/entities/post.entity";
import { AccountEntity } from "@/entities/account.entity";

@EntityRepository()
class SavedPostService extends Repository<SavedPostEntity> {
    //check curent user is saved post or not
    public async isSaved(post: PostEntity, currAccount: AccountEntity): Promise<boolean> {
        const data = await SavedPostEntity.findOne({
            where: {
                accountID: currAccount.id,
                postID: post.id
            }
        });       

        return data ? true : false;
    }

    //remove row with postId
    public async deleteSavedPost(postID: number): Promise<void> {
        const data = await SavedPostEntity.find({
            where: {
                postID
            }
        });

        await SavedPostEntity.remove(data);
    }
}

export default SavedPostService;