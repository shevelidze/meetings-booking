import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './user.entity';
import { SlotType } from './slot-type.entity';

@Entity()
export class SlotRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slotsCount: number;

  @Column()
  time: number;

  @Column({ type: 'int', array: true })
  dayOfWeekIndexes: number[];

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => SlotType)
  slotType: SlotType;
}
