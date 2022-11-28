import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Comment } from "@/interfaces/comment.interface";

@Entity()
export class CommentEnitty extends BaseEntity implements Comment {
    @PrimaryGeneratedColumn()
    commentID: number;

    @Column()
    @IsNotEmpty()
    postID: number;

    @Column()
    @IsNotEmpty()
    accountID: number;

    @Column()
    @IsNotEmpty()
    content: string;
 
    @CreateDateColumn()
    createdAt: Date;
}