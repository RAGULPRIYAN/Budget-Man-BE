import { Test, TestingModule } from '@nestjs/testing';
import { RemainderController } from './remainder.controller';
import { RemainderService } from './remainder.service';

describe('RemainderController', () => {
  let controller: RemainderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemainderController],
      providers: [RemainderService],
    }).compile();

    controller = module.get<RemainderController>(RemainderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
