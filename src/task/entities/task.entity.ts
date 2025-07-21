import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column()
  time: string; // yoki Date

  @Column()
  level: 'low' | 'medium' | 'high';

  @Column({ default: 'faol' })
  status: 'faol' | 'bajarilgan';
}
