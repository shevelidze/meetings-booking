import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryColumn({ unique: true })
  name: string;
}
