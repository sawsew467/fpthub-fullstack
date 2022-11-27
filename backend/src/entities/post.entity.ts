import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Post } from '@/interfaces/post.interface';

@Entity()
export class PostEntity extends BaseEntity implements Post {
    @PrimaryGeneratedColumn()
    postID: number;
    
    @Column()
    @IsNotEmpty()
    accountID: number;
    
    @Column()
    @IsNotEmpty()
    tag: string;
    
    @Column()
    like: number;
    
    @Column()
    dislike: number;

    @Column()
    @IsNotEmpty()
    content: string;
    
    @Column()
    attachement: string;

    @CreateDateColumn()
    createdAt: Date;
}
