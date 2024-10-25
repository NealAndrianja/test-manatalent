import { Module } from '@nestjs/common';
import { UserEntityService } from './user-entity.service';
import { UserEntityController } from './user-entity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserEntity } from './entities/user-entity.entity';
import { EntityEntity } from '../entity/entities/entity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([EntityEntity]),
  ],
  controllers: [UserEntityController],
  providers: [UserEntityService],
})
export class UserEntityModule {}
