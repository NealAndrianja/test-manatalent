import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserEntityDto } from './dto/create-user-entity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user-entity.entity';
import { Repository } from 'typeorm';
import { UserEntityInterface } from './types/UserEntityInterface';
import { User } from '../user/entities/user.entity';
import { EntityEntity } from '../entity/entities/entity.entity';

@Injectable()
export class UserEntityService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(EntityEntity)
    private entityRepository: Repository<EntityEntity>,
  ) {}

  async create(
    createUserEntityDto: CreateUserEntityDto,
  ): Promise<UserEntityInterface> {
    const { userId, entityId } = createUserEntityDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(
        `L'utilisateur avec l'ID ${userId} n'existe pas`,
      );
    }

    const entity = await this.entityRepository.findOneBy({ id: entityId });
    if (!entity) {
      throw new NotFoundException(
        `L'entité avec l'ID ${entityId} n'existe pas`,
      );
    }

    const newUserEntity = await this.userEntityRepository.create({
      user,
      entity,
    });
    try {
      const savedUserEntity =
        await this.userEntityRepository.save(newUserEntity);
      return savedUserEntity;
    } catch (error) {
      throw new BadRequestException(
        ' Erreur lors de la création de la relation utilisateur - entité',
      );
    }
  }

  async findAll(): Promise<UserEntityInterface[]> {
    return await this.userEntityRepository.find({
      relations: ['user', 'entity'],
    });
  }

  async findOne(id: number): Promise<UserEntityInterface> {
    const userEntity = await this.userEntityRepository.findOne({
      where: { id },
      relations: ['user', 'entity'],
    });
    if (!userEntity) {
      throw new NotFoundException(`Association avec l'ID ${id} non trouvée`);
    }
    return userEntity;
  }

  async update(id: number, updateUserEntityDto: Partial<CreateUserEntityDto>): Promise<UserEntityInterface> {
    const userEntity = await this.findOne(id)
    if (!userEntity) {
      throw new NotFoundException(`Association avec l'ID ${id} non trouvée`);
    }
    Object.assign(userEntity, updateUserEntityDto)

    return await this.userEntityRepository.save(userEntity);
  }

  async remove(id: number): Promise<void> {
    const userEntity = await this.findOne(id);
    await this.userEntityRepository.remove(userEntity);
  }
}
