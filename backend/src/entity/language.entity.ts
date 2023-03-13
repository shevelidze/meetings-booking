import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Language {
  @PrimaryColumn({ unique: true })
  name: string;
}
