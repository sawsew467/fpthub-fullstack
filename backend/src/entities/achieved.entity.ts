import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm';
import { Achieved } from "@/interfaces/achieved.inteface";

@Entity()
export class AchievedEntity extends BaseEntity implements Achieved {
    @PrimaryColumn()
    accountID: number;
    
    @PrimaryColumn()
    majorID: string;
    
    @Column()
    cocVang: number;
    
    @Column()
    excellent: number;
    
    @Column()
    good: number;
    
    @Column()
    point: number;
}