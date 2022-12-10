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

@EntityRepository()
class PostService extends Repository<PostEntity> {
    accountService = new AccountService();
    userProfileService = new UserProfileService();
    likedService = new LikedService();
    disklikedPostService = new DislikedPostService();
    savedPostService = new SavedPostService();

    public async serializePostsArray(allPosts: PostEntity[], currAccount: AccountEntity): Promise<PostEntity[]> {
        for (const post of allPosts) {
            const isLiked = await this.likedService.isLiked(post, currAccount);
            const isDisliked = await this.disklikedPostService.isDisliked(post, currAccount);
            const isSaved = await this.savedPostService.isSaved(post, currAccount);
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

    //delete post by id
    public async deletePostById(id: number): Promise<number> {
        await PostEntity.createQueryBuilder("post")
                .delete()
                .where("id = :id", {id})
                .execute();

        //remove all post id in saved, like, disLike table
        await this.likedService.deleteLikedPost(id);
        await this.disklikedPostService.deleteDislikedPost(id);
        await this.savedPostService.deleteSavedPost(id);
        return id;
    }


    //like post
}

export default PostService;