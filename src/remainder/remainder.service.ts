import { Injectable } from '@nestjs/common';
import { CreateRemainderDto } from './dto/create-remainder.dto';
import { UpdateRemainderDto } from './dto/update-remainder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { filters, remainder } from './entities/remainder.entity';
import { Repository } from 'typeorm';
import { budgets } from 'src/budget/entities/budget.entity';

@Injectable()
export class RemainderService {
  @InjectRepository(filters)
  private filtersRepository: Repository<filters>;

  @InjectRepository(remainder)
  private remainderRepository: Repository<remainder>;

  async createRemainder(data){
    return  await this.remainderRepository.save(data);
  }

  async updateRemainder(id,data){
    return  await this.remainderRepository.update(id,data);
  }

  async getRemainder(){
    return  await this.remainderRepository.find();
  }

  async getRemainderId(id){
    return  await this.remainderRepository.findOne({where:{id}})
  }

  async getRemainderWiseBudgetId(id){
    let data =  await this.remainderRepository.createQueryBuilder("r")
    .leftJoin(budgets,"b",'b.id = r.budgetId')
    .leftJoin(filters,"f","f.id = r.filterId")
    .select("r.id as id,b.id as budgetId,f.id as filterId,f.filterData as filterData")
    .where("r.budgetId = :budgetId", { budgetId:id })
    .getRawOne();
    return data
  }

  async deleteRemainder(id) {
    return await this.remainderRepository.softDelete(id);
  }

  async getFilter(){
    return  await this.filtersRepository.find();
  }
  create(createRemainderDto: CreateRemainderDto) {
    return 'This action adds a new remainder';
  }

  findAll() {
    return `This action returns all remainder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} remainder`;
  }

  update(id: number, updateRemainderDto: UpdateRemainderDto) {
    return `This action updates a #${id} remainder`;
  }

  remove(id: number) {
    return `This action removes a #${id} remainder`;
  }
}
