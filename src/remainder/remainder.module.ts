import { Module } from '@nestjs/common';
import { RemainderService } from './remainder.service';
import { RemainderController } from './remainder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { filters, remainder } from './entities/remainder.entity';

@Module({
  controllers: [RemainderController],
  providers: [RemainderService],
  imports :[TypeOrmModule.forFeature([
    filters,remainder
     ])]
})
export class RemainderModule {}
