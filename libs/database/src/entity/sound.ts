import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Sound {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column()
  name: string;

  @Column()
  status: string;
}
