import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Language } from './language.entity';
import { User } from './user.entity';

@Entity()
export class SlotType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: number;

  @ManyToOne(() => Language, { nullable: true })
  defaultLanguage: Language | null;

  @Column()
  color: string;

  @ManyToOne(() => User)
  user: User;
}
