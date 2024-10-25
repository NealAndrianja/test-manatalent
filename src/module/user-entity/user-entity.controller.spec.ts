import { Test, TestingModule } from '@nestjs/testing';
import { UserEntityController } from './user-entity.controller';
import { UserEntityService } from './user-entity.service';

describe('UserEntityController', () => {
  let controller: UserEntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEntityController],
      providers: [UserEntityService],
    }).compile();

    controller = module.get<UserEntityController>(UserEntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
