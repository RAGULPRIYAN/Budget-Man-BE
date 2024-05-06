import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { budgets, expenses, setBudgetAmount } from './entities/budget.entity';

@Module({
  controllers: [BudgetController],
  providers: [BudgetService],
  imports :[TypeOrmModule.forFeature([
   setBudgetAmount,expenses,budgets
    ])]
})
export class BudgetModule {}
