import { IsNotEmpty } from 'class-validator';
import { 
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
} from 'typeorm';
import { UserProfile } from '@/interfaces/userProfile.interface';

@Entity()
export class UserProfileEntity extends BaseEntity implements UserProfile {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  @IsNotEmpty()
  fullname: string;
  
  @Column()
  @IsNotEmpty()
  majorID: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column("longtext")
  @IsNotEmpty()
  avatar: string;

  @Column()
  @IsNotEmpty()
  accountId: number
}
