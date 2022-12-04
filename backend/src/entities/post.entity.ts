import { IsNotEmpty } from 'class-validator';
import { 
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    ManyToOne,
    OneToMany
} from 'typeorm';
import { Post } from '@/interfaces/post.interface';
import { AccountEntity } from './account.entity';
import { CommentEnitty } from './comment.entity';

@Entity()
export class PostEntity extends BaseEntity implements Post {
    @PrimaryGeneratedColumn()
    id: number;
        
    @Column()
    @IsNotEmpty()
    tag: string;
    
    @Column()
    like: number;
    
    @Column()
    @IsNotEmpty()
    content: string;
    
    @Column()
    attachement: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => AccountEntity, (account) => account.posts)
    account: AccountEntity;

    @OneToMany(() => CommentEnitty, (comment) => comment.post)
    comments: CommentEnitty[]
}
