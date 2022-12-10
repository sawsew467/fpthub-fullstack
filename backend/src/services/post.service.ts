import { EntityRepository, Repository } from "typeorm";
import { PostEntity } from "@/entities/post.entity";
import AccountService from "./accounts.service";
import { CreatePostDto, PostDto } from "@/dtos/post.dto";
import { AccountEntity } from "@/entities/account.entity";
import { plainClass } from "@/utils/plainClass";
import UserProfileService from "./userProfile.service";

@EntityRepository()
class PostService extends Repository<PostEntity> {
    accountService = new AccountService();
    userProfileService = new UserProfileService();

    //create post
    public async createPost(postData: CreatePostDto): Promise<PostEntity>{
        const account: AccountEntity = await this.accountService.findAccountById(postData.accountId);
        const createPost: PostEntity = await PostEntity.create(postData);
        createPost.like = 0;
        createPost.account = account;
        await PostEntity.save(createPost);

        return createPost;
    }


    //get all post
    public async getAllPost(): Promise<PostEntity[]> {
        const account = new AccountEntity();
        const allPost: PostEntity[] = await PostEntity.createQueryBuilder("post")
                                            .leftJoinAndSelect("post.account", "account")
                                            .getMany()
        
        for (const post of allPost) {
            const newPost = plainClass(PostDto, post);
            
            const { fullname } = await this.userProfileService.findUserProfileById(newPost.accountId);
            const index = allPost.indexOf(post);
            allPost[index] = { ...newPost, fullname } as PostEntity;
        }

        return allPost;
    }

    //get post by tag
    public async getPostByTag(tag: string): Promise<PostEntity[]> {
        const allPost: PostEntity[] = await PostEntity.find({
            where: {
                tag
            }, 
            order: {
                createdAt: "ASC"
            }
        });

        return allPost;
    }

    //get post by account ID

    //delete post

    //like post
}

export default PostService;