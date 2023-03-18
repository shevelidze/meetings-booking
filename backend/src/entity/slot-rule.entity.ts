import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './user.entity';
import { SlotType } from './slot-type.entity';

@Entity()
export class SlotRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slotCount: number;

  @Column()
  time: number;

  @Column({ type: 'int', array: true })
  daysOfWeekIndexes: number[];

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => SlotType)
  slotType: SlotType;
}
