import { Router } from 'express';
import PostController from '@/controllers/post.controller';
import { CreatePostDto } from '@/dtos/post.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';

class PostRoute implements Routes{
    public path = '/posts';
    public router = Router();
    public postController = new PostController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, validationMiddleware(CreatePostDto, 'body') ,this.postController.createPost);
        this.router.get(`${this.path}`, this.postController.getAllPost);
    }
}

export default PostRoute;