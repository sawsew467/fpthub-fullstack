import { EntityRepository, Repository } from "typeorm";
import { SavedPostEntity } from "@/entities/savedPost.entity";
import { PostEntity } from "@/entities/post.entity";
import { AccountEntity } from "@/entities/account.entity";

@EntityRepository()
class SavedPostService extends Repository<SavedPostEntity> {
    //check curent user is saved post or not
    public async isSaved(postID: number, accountID: number): Promise<boolean> {
        const data = await SavedPostEntity.findOne({
            where: {
                accountID,
                postID
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
  
    public async savedPost(postID: number, accountID: number): Promise<void> {
        const data = await this.isSaved(postID, accountID);
        if(data){
            return;
        }
        await SavedPostEntity.create({ postID, accountID }).save();
    }

    public async unSavedPost(postID: number, accountID: number): Promise<void> {
        const data = await this.isSaved(postID, accountID);
        if(!data){
            return;
        }
        const savedPost: SavedPostEntity = await SavedPostEntity.findOne({ where: { postID, accountID } });
        await SavedPostEntity.remove(savedPost);
    }

    //get all post that accountID save
    public async allPostSaved(accountID: number): Promise<SavedPostEntity[]> {
        const data: SavedPostEntity[] = await SavedPostEntity.find({ where: {accountID} });
        return data;
    }
}

export default SavedPostService;