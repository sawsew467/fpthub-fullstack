import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { SavedPost } from "@/interfaces/savedPost.interface";

@Entity()
export class SavedPostEntity extends BaseEntity implements SavedPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountID: number;

    @Column()
    postID: number; 
}