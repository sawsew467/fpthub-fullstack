import { IsNotEmpty } from 'class-validator';
import { 
  BaseEntity, 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  Unique, 
  OneToMany 
} from 'typeorm';
import { Account } from '@/interfaces/accounts.interface';
import { PostEntity } from './post.entity';
import { CommentEnitty } from './comment.entity';

@Entity()
export class AccountEntity extends BaseEntity implements Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Unique(['email'])
  email: string;
  
  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  role: number;

  @OneToMany(() => PostEntity, (post) => post.account, { cascade: true})
  posts: PostEntity[];

  @OneToMany(() => CommentEnitty, (comment) => comment.account, { cascade: true })
  comments: CommentEnitty[]
}
