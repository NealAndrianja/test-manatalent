import { EntityEntity } from 'src/module/entity/entities/entity.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => EntityEntity, (entity) => entity.id)
  entity: EntityEntity;
}
