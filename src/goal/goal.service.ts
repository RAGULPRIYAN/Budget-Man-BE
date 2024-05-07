import { Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { goal } from './entities/goal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoalService {
  @InjectRepository(goal)
  private goalRepository: Repository<goal>;

  async createGoal(data){
    return  await this.goalRepository.save(data);
  }

  async updateGoal(id,data){
    return  await this.goalRepository.update(id,data);
  }

  async getGoal(userId){
    let data = await this.goalRepository.createQueryBuilder("g")
    .select('g.id as id,g.goalName as goalName,g.goalAmount as goalAmount,g.savedAmount as savedAmount,g.targetDate as targetDate')
    .where({createdBy:userId})
    .execute()
   return data
  }

  async getGoalId(id,userId){
    let data = await this.goalRepository.createQueryBuilder("g")
    .select('g.id as id,g.goalName as goalName,g.goalAmount as goalAmount,g.savedAmount as savedAmount,g.targetDate as targetDate')
    .where({id:id})
    .andWhere({createdBy:userId})
    .execute()
   return data
    
  }

  async deleteGoal(id) {
    return await this.goalRepository.softDelete(id);
  }


  create(createGoalDto: CreateGoalDto) {
    return 'This action adds a new goal';
  }

  findAll() {
    return `This action returns all goal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} goal`;
  }

  update(id: number, updateGoalDto: UpdateGoalDto) {
    return `This action updates a #${id} goal`;
  }

  remove(id: number) {
    return `This action removes a #${id} goal`;
  }
}
