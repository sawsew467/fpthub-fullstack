import { NextFunction, Request, Response } from "express";
import { RequestWithAccount } from "@/interfaces/auth.interface";
import PostService from '@/services/post.service';
import UserProfileService from "@/services/userProfile.service";
import { CreatePostDto, PostDto } from '../dtos/post.dto';
import { PostEntity } from "@/entities/post.entity";
import { plainClass } from '@/utils/plainClass';
import { AccountEntity } from "@/entities/account.entity";

class PostController {
    postService = new PostService();
    userProfileService = new UserProfileService();

    //create post
    public createPost = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
        try {
            const postData: CreatePostDto = req.body;
            const createPost: PostEntity = await this.postService.createPost(postData);

            const createPostData = plainClass(PostDto ,createPost);
            const { fullname } = await this.userProfileService.findUserProfileById(postData.accountId);
            res.status(201).json({ data: {...createPostData, fullname}, message: 'created' })
        } catch (error) {
            next(error)
        }
    }

    //get post
    public getAllPost = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
        try {
            const postsData: PostEntity[] = await this.postService.getAllPost(req.account as AccountEntity);

            res.status(200).json({ data: postsData, message: 'findAll' })
        } catch (error) {
            next(error);
        }
    }

    public getPostsByTag = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tag: string = req.params.tag;
            const postsData: PostEntity[] = await this.postService.getPostsByTag(tag, req.account as AccountEntity);

            res.status(200).json({ data: postsData, messages: 'findAll' })
        } catch (error) {
            next(error)
        }
    }

    public getPostsByAccountId = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
        try {
            const accountId = parseInt(req.params.accountId);
            const postsData: PostEntity[] = await this.postService.getPostsByAccountId(accountId, req.account as AccountEntity);

            res.status(200).json({ data: postsData, messages: 'findAll' });
        } catch (error) {
            next(error)
        }
    }
    //delete post
    public deletePostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const postId = parseInt(req.params.postId);
            await this.postService.deletePostById(postId);

            res.status(200).json({ data: { postId }, messages: 'delete'});
        } catch (error) {
            next(error);
        }
    }

    //like post
    public userLikePost = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
        try {
            const postID = parseInt(req.params.postId);
            await this.postService._userLikePost(postID, req.account as AccountEntity);

            res.status(201).json({ data: { postID }, messages: `update like post with id ${postID}` });
        } catch (error) {
            next(error)
        }
    }

    //unlike post
    public userUnlikePost = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
        try {
            const postID = parseInt(req.params.postId);
            await this.postService._userUnlikePost(postID, req.account as AccountEntity );
            
            res.status(201).json({ data: { postID }, messages: `update unlike post with id ${postID}` });
        } catch (error) {
            next(error);
        }
    }

    //report post
    public reportPost = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
        try {
            const postID = parseInt(req.params.postId);
            await this.postService._userReportPost(postID, req.account as AccountEntity);

            res.status(201).json({ data: {postID} , messages: `report post with id ${postID}`});
        } catch (error) {
            next(error);
        }
    }

    public unreportPost = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
        try {
            const postID = parseInt(req.params.postId);
            await this.postService._userUnReportPost(postID, req.account as AccountEntity);

            res.status(201).json({ data: {postID} , messages: `unreport post with id ${postID}`});
        } catch (error) {
            next(error);
        }
    }

    //save post
    public userSavedPost = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
        try {
            const postID = parseInt(req.params.postId);
            await this.postService._userSavePost(postID, req.account as AccountEntity);

            res.status(201).json({ data: {postID}, messages: `saved post with id ${postID} ` });
        } catch (error) {
            next(error);
        }
    }

    public userUnsavedPost = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
        try {
            const postID = parseInt(req.params.postId);
            await this.postService._userUnsavedPost(postID, req.account as AccountEntity);

            res.status(201).json({ data: {postID}, messages: `unsaved post with id ${postID} ` });
        } catch (error) {
            next(error);
        }
    }

    //get all post saved by account
    public getAllPostSaved = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
        try {
            const savedPosts = await this.postService._getAllSavedPosts(req.account as AccountEntity);

            res.status(200).json({ data: {savedPosts}, messages: "find all" });
        } catch (error) {
            next(error);
        }
    }
}

export default PostController;