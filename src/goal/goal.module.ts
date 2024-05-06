import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { goal } from './entities/goal.entity';

@Module({
  controllers: [GoalController],
  providers: [GoalService],
  imports :[TypeOrmModule.forFeature([
    goal
     ])]
})
export class GoalModule {}
