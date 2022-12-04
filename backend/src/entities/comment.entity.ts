import { IsNotEmpty } from 'class-validator';
import { 
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn,
    ManyToOne
} from 'typeorm';
import { Comment } from "@/interfaces/comment.interface";
import { AccountEntity } from './account.entity';
import { PostEntity } from './post.entity';

@Entity()
export class CommentEnitty extends BaseEntity implements Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    content: string;
 
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => PostEntity, (post) => post.comments)
    post: PostEntity;

    @ManyToOne(() => AccountEntity, (account) => account.comments)
    account: AccountEntity;
}