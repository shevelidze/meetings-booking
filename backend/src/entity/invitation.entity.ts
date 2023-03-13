import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './user.entity';
import { Language } from './language.entity';
import { SlotType } from './slot-type.entity';

@Entity()
export class Invitation {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Language)
    language: Language;

    @ManyToOne(() => SlotType)
    slotType: SlotType;
}
