import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NameSuggestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  suggestion: string;
}
