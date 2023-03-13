import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DurationSuggestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  suggestion: number;
}
