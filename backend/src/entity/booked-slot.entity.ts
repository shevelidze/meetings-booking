import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { SlotRule } from './slot-rule.entity';

@Entity()
export class BookedSlot {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    bookerEmail: string;

    @Column()
    date: Date;

    @Column()
    slotIndex: number;

    @ManyToOne(() => SlotRule)
    slotRule: SlotRule;
}
