import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BudgetModule } from './budget/budget.module';
import { budgets, expenses, setBudgetAmount } from './budget/entities/budget.entity';
import { User } from './user/entities/user.entity';
import { GoalModule } from './goal/goal.module';
import { goal } from './goal/entities/goal.entity';
import { RemainderModule } from './remainder/remainder.module';
import { filters, remainder } from './remainder/entities/remainder.entity';

import { APP_GUARD } from "@nestjs/core";
import { SSOGuard } from "./guards/sso.guard";



@Module({
  imports: [  ConfigModule.forRoot(),
     TypeOrmModule.forRoot({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    // synchronize: true,
    entities: [ setBudgetAmount,expenses,budgets,User,goal, filters,remainder
    ],
  }),UserModule, BudgetModule, GoalModule, RemainderModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: SSOGuard,
      
    },
  ],
 
})
export class AppModule {}
