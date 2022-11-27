import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm';
import { Rank } from '@/interfaces/rank.interface';

@Entity()
export class RankEntity extends BaseEntity implements Rank {
    @PrimaryColumn()
    accountID: number;

    @PrimaryColumn()
    majorID: string;

    @Column()
    point: number;
}
