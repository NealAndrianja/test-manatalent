import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserInterface } from './types/UserInterface';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto): Promise<UserInterface> {
    const newUser = this.userRepository.create(createUserDto)
    try {
      const savedUser = await this.userRepository.save(newUser)
      return savedUser
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de l\'utilisateur')
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: Partial<CreateUserDto>) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
