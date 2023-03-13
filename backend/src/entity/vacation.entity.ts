import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Vacation {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    startingDate: Date;

    @Column()
    finishingDate: Date;

    @ManyToOne(() => User)
    user: User;
}
