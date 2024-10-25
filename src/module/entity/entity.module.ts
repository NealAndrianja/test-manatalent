import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityEntity } from './entities/entity.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([EntityEntity])
  ],
  controllers: [EntityController],
  providers: [EntityService],
})
export class EntityModule {}
