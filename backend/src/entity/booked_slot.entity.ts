import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { SlotRule } from './slot_rule.entity';

@Entity()
export class BookedSlot {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    booker_email: string;

    @Column()
    date: Date;

    @Column()
    slot_index: number;

    @ManyToOne(() => SlotRule)
    slotRule: SlotRule;
}
