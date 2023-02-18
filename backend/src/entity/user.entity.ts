import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

import { Country } from './country.entity';

@Entity()
export class User {
  @PrimaryColumn()
  email: string;

  @Column()
  passwordHash: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToOne(() => Country)
  country: Country;
}
