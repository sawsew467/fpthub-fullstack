import { NextFunction, Request, Response } from "express";
import PostService from '@/services/post.service';
import UserProfileService from "@/services/userProfile.service";
import { UserProfileEntity } from "@/entities/userProfile.entity";
import { CreatePostDto, PostDto } from '../dtos/post.dto';
import { PostEntity } from "@/entities/post.entity";
import { plainClass } from '@/utils/plainClass';

class PostController {
    postService = new PostService();
    userProfileService = new UserProfileService();

    //create post
    public createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
    public getAllPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const postsData: PostEntity[] = await this.postService.getAllPost();

            res.status(200).json({ data: postsData, message: 'findAll' })
        } catch (error) {
            next(error);
        }
    }


    //delete post

    //like post
}

export default PostController;