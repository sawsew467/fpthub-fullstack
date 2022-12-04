import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { LikedPost } from "@/interfaces/likedPost.interface";

@Entity()
export class LikedPostEntity extends BaseEntity implements LikedPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountID: number;

    @Column()
    postID: number; 
}