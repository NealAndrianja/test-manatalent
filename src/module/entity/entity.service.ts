import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityEntity } from './entities/entity.entity';
import { Repository } from 'typeorm';
import { EntityInterface } from './types/EntityInterface';
import { CreateEntityDto } from './dto/create-entity.dto';

@Injectable()
export class EntityService {
  constructor(
    @InjectRepository(EntityEntity)
    private entityRepository: Repository<EntityEntity>,
  ) {}

  async create(createEntityDto: CreateEntityDto): Promise<EntityInterface> {
    const newEntity = this.entityRepository.create({
      ...createEntityDto,
      createdAt: new Date(),
    });

    try {
      const savedEntity = await this.entityRepository.save(newEntity);
      return savedEntity;
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de l\'entité');
    }
  }

  async findAll(): Promise<EntityInterface[]> {
    return await this.entityRepository.find()
  }

  async findOne(id: number): Promise<EntityInterface> {
    const entity = await this.entityRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`L'entité avec l'ID ${id} n'existe pas`);
    }
    return entity;
  }

  async update(id: number, updateEntityDto: Partial<CreateEntityDto>): Promise<EntityInterface> {
    const entity = await this.findOne(id);
    if (!entity) {
      throw new NotFoundException(`L'entité avec l'ID ${id} n'existe pas`);
    }

    Object.assign(entity, updateEntityDto);

    try {
      return await this.entityRepository.save(entity);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la mise à jour de l\'entité');
    }
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    if (!entity) {
      throw new NotFoundException(`L'entité avec l'ID ${id} n'existe pas`);
    }

    await this.entityRepository.remove(entity);
  }
}
