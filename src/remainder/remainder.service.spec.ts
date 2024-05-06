import { Test, TestingModule } from '@nestjs/testing';
import { RemainderService } from './remainder.service';

describe('RemainderService', () => {
  let service: RemainderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemainderService],
    }).compile();

    service = module.get<RemainderService>(RemainderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
