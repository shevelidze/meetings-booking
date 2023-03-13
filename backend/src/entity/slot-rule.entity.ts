import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './user.entity';
import { SlotType } from './slot-type.entity';

@Entity()
export class SlotRule {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    slotCount: number;

    @Column()
    time: number;

    @Column()
    daysOfWeekIndexes: number[];

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => SlotType)
    slotType: SlotType;
}
