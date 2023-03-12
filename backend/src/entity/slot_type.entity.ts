import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Language } from './language.entity';

@Entity()
export class SlotType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    duration: number;

    @ManyToOne(() => Language)
    language: Language;
}
