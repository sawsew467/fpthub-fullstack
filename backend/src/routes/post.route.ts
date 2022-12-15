import { Router } from 'express';
import PostController from '@/controllers/post.controller';
import { CreatePostDto } from '@/dtos/post.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import validationAccountId from '@/middlewares/validationAccountId.middleware';

class PostRoute implements Routes{
    public path = '/posts';
    public router = Router();
    public postController = new PostController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(authMiddleware);
        this.router.post(`${this.path}`, validationMiddleware(CreatePostDto, 'body') ,this.postController.createPost);
        this.router.get(`${this.path}`, this.postController.getAllPost);
        this.router.get(`${this.path}/tag/:tag`, this.postController.getPostsByTag);
        this.router.get(`${this.path}/account/:accountId`, validationAccountId ,this.postController.getPostsByAccountId);
        this.router.delete(`${this.path}/delete/:postId`, this.postController.deletePostById);
        this.router.post(`${this.path}/like/:postId`, this.postController.userLikePost);
        this.router.post(`${this.path}/unlike/:postId`, this.postController.userUnlikePost);
        this.router.post(`${this.path}/report/:postId`, this.postController.reportPost);
        this.router.post(`${this.path}/unreport/:postId`, this.postController.unreportPost);
        this.router.get(`${this.path}/saved`, this.postController.getAllPostSaved);
        this.router.post(`${this.path}/save/:postId`, this.postController.userSavedPost);
        this.router.post(`${this.path}/unsave/:postId`, this.postController.userUnsavedPost);
    }
}

export default PostRoute;