import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Vacation {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    starting_date: Date;

    @Column()
    finishing_date: Date;

    @ManyToOne(() => User)
    user: User;
}
