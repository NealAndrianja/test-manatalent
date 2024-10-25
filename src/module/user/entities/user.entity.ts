import { EntityEntity } from 'src/module/entity/entities/entity.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  name: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 2, nullable: true })
  language: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 250 })
  password: string;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;
}
