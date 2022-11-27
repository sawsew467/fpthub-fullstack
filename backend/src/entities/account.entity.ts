import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { Account } from '@/interfaces/accounts.interface';

@Entity()
export class AccountEntity extends BaseEntity implements Account {
  @PrimaryGeneratedColumn()
  accountID: number;
  
  @Column()
  @IsNotEmpty()
  studentName: string;
  
  @Column()
  @IsNotEmpty()
  @Unique(['email'])
  email: string;
  
  @Column()
  @IsNotEmpty()
  password: string;
  
  @Column()
  @IsNotEmpty()
  follow: number;  
  
  @Column()
  @IsNotEmpty()
  role: number;

  @Column()
  @IsNotEmpty()
  avatar: string;
}
