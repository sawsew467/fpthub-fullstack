import { EntityRepository, Repository } from "typeorm";
import { PostEntity } from "@/entities/post.entity";
import AccountService from "./accounts.service";
import { CreatePostDto, PostDto } from "@/dtos/post.dto";
import { AccountEntity } from "@/entities/account.entity";
import { plainClass } from "@/utils/plainClass";
import UserProfileService from "./userProfile.service";
import LikedService from "./liked.service";
import DislikedPostService from "./disliked.service";
import SavedPostService from "./savedPost.service";
import { SavedPostEntity } from "@/entities/savedPost.entity";

@EntityRepository()
class PostService extends Repository<PostEntity> {
    accountService = new AccountService();
    userProfileService = new UserProfileService();
    likedService = new LikedService();
    disklikedPostService = new DislikedPostService();
    savedPostService = new SavedPostService();

    public async serializePostsArray(allPosts: PostEntity[], currAccount: AccountEntity): Promise<PostEntity[]> {
        for (const post of allPosts) {
            const isLiked = await this.likedService.isLiked(post.id, currAccount);
            const isDisliked = await this.disklikedPostService.isDisliked(post.id, currAccount);
            const isSaved = await this.savedPostService.isSaved(post.id, currAccount.id);
            const newPost = plainClass(PostDto, post);

            const { fullname } = await this.userProfileService.findUserProfileById(newPost.accountId);
            const index = allPosts.indexOf(post);
            allPosts[index] = { ...newPost, fullname, isLiked, isDisliked, isSaved } as PostEntity;
        }

        return allPosts;
    }

    //create post
    public async createPost(postData: CreatePostDto): Promise<PostEntity> {
        const account: AccountEntity = await this.accountService.findAccountById(postData.accountId);
        const createPost: PostEntity = await PostEntity.create(postData);
        createPost.like = 0;
        createPost.account = account;
        await PostEntity.save(createPost);

        return createPost;
    }


    //get all post

    //return post that current user haved liked
    public async getAllPost(currentAccount: AccountEntity): Promise<PostEntity[]> {
        console.log(currentAccount)
        let allPosts: PostEntity[] = await PostEntity.createQueryBuilder("post")
            .leftJoinAndSelect("post.account", "account")
            .getMany()

        allPosts = await this.serializePostsArray(allPosts, currentAccount);

        return allPosts;
    }

    //get post by tag
    public async getPostsByTag(tag: string, currentAccount: AccountEntity): Promise<PostEntity[]> {
        let allPosts: PostEntity[] = await PostEntity.createQueryBuilder("post")
            .leftJoinAndSelect("post.account", "account")
            .where("tag = :tag", { tag })
            .orderBy("post.createdAt", "ASC")
            .getMany();
        allPosts = await this.serializePostsArray(allPosts, currentAccount);

        return allPosts;
    }

    //get post by account ID
    public async getPostsByAccountId(accountId: number, currentAccount: AccountEntity): Promise<PostEntity[]> {
        let allPosts: PostEntity[] = await PostEntity.createQueryBuilder("post")
            .leftJoinAndSelect("post.account", "account")
            .where("accountId = :accountId", { accountId })
            .orderBy("post.createdAt", "ASC")
            .getMany();
        allPosts = await this.serializePostsArray(allPosts, currentAccount);

        return allPosts;
    }

    //get Post by Post ID
    public async getPostsByPostId(savedPosts: SavedPostEntity[], currentAccount: AccountEntity): Promise<PostEntity[]> {
        let savedPostsArray: PostEntity[] = [];

        for (const post of savedPosts) {
            let postData: PostEntity = await PostEntity.createQueryBuilder("post")
                .leftJoinAndSelect("post.account", "account")
                .where("post.id = :id", {id: post.postID})
                .orderBy("post.createdAt", "ASC")
                .getOne()
            
            savedPostsArray.push(postData); 
        }

        savedPostsArray = await this.serializePostsArray(savedPostsArray, currentAccount);
        return savedPostsArray
    }

    //delete post by id
    public async deletePostById(id: number): Promise<number> {
        await PostEntity.createQueryBuilder("post")
            .delete()
            .where("id = :id", { id })
            .execute();

        //remove all post id in saved, like, disLike table
        await this.likedService.deleteLikedPost(id);
        await this.disklikedPostService.deleteDislikedPost(id);
        await this.savedPostService.deleteSavedPost(id);
        return id;
    }


    //like post
    public async _userLikePost(id: number, currentAccount: AccountEntity): Promise<void> {
        const isLike: boolean = await this.likedService.isLiked(id, currentAccount);
        if(isLike){
            return;
        }
        await this._userUnReportPost(id, currentAccount);
        this.likedService.userLikePost(id, currentAccount.id);
        //increase like of post 
        const data: PostEntity = await PostEntity.findOne({ where: { id } });
        // console.log(data);
        data["like"] = data["like"]+1;
        // console.log(data);
        await PostEntity.save(data);
    }

    public async _userUnlikePost(id: number, currentAccount: AccountEntity): Promise<void> {
        const isLike: boolean = await this.likedService.isLiked(id, currentAccount);
        if(!isLike){
            return;
        }
        await this.likedService.userUnlikePost(id, currentAccount.id);
        //decrease like of post
        const data: PostEntity = await PostEntity.findOne({ where: { id } });
        const like = data["like"]-1;
        data["like"] = like >= 0 ? like : 0;
        await PostEntity.save(data); 
    }

    // cam co post
    public async _userReportPost(id: number, currentAccount: AccountEntity): Promise<void> {
        const isDisliked: boolean = await this.disklikedPostService.isDisliked(id, currentAccount);
        if(isDisliked){
            return;
        }
        //decrease like post and delete in like table with accountId and postID
        await this._userUnlikePost(id, currentAccount);
        //create report 
        await this.disklikedPostService.createReport(id, currentAccount.id);
    }

    public async _userUnReportPost(id: number, currentAccount: AccountEntity): Promise<void> {
        const isDisliked: boolean = await this.disklikedPostService.isDisliked(id, currentAccount);
        if(!isDisliked){
            return;
        }
        await this.disklikedPostService.findAndDelete(id, currentAccount.id);
    }

    public async _userSavePost(id: number, currentAccount: AccountEntity): Promise<void> {
        await this.savedPostService.savedPost(id, currentAccount.id);
    }

    public async _userUnsavedPost(id: number, currentAccount: AccountEntity): Promise<void> {
        await this.savedPostService.unSavedPost(id, currentAccount.id);
    }

    //get all post saved by accountID
    public async _getAllSavedPosts(currentAccount: AccountEntity): Promise<PostEntity[]> {
        const data: SavedPostEntity[] = await this.savedPostService.allPostSaved(currentAccount.id);
        const savedPosts: PostEntity[] = await this.getPostsByPostId(data, currentAccount);

        return savedPosts;
    }

}

export default PostService;