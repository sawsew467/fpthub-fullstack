import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DislikedPost } from "@/interfaces/dislikedPost.interface";

@Entity()
export class DislikedPostEntity extends BaseEntity implements DislikedPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountID: number;

    @Column()
    postID: number; 
}