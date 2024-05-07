import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { budgets, expenses, setBudgetAmount } from './entities/budget.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BudgetService {
  @InjectRepository(setBudgetAmount)
  private setBudgetAmountRepository: Repository<setBudgetAmount>;

  @InjectRepository(expenses)
  private expensesRepository: Repository<expenses>;

  @InjectRepository(budgets)
  private budgetsRepository: Repository<budgets>;

  create(createBudgetDto: CreateBudgetDto) {
    return 'This action adds a new budget';
  }

  async createBudgetAmount(data){
    return  await this.setBudgetAmountRepository.save(data);
  }

  async createExpenseNames(data){
    return  await this.expensesRepository.save(data);
  }

  async createBudget(data){
    return  await this.budgetsRepository.save(data);
  }

  async updateBudget(id,data){
    return  await this.budgetsRepository.update(id,data);
  }

  async getAllBudgetAmount(userId){
    let data =await this.setBudgetAmountRepository.createQueryBuilder("ba")
    .select("ba.id as id,ba.budget as budget")
    .where({createdBy:userId})
    .orderBy("ba.createdAt", "DESC")
    .execute();
    return data
    
  }

  async getAllBudgetName(userId){
    let data =await this.expensesRepository.createQueryBuilder("ba")
    .select("ba.id as id,ba.expense as expense")
    .where({createdBy:userId})
    .orderBy("ba.createdAt", "DESC")
    .execute();
    return data
  
  }

  async getAllBudgets(userId){
    let data = await this.budgetsRepository.createQueryBuilder("b")
    .leftJoin(setBudgetAmount,"sb","sb.id = b.setAmountId")
    .leftJoin(expenses,"ex","ex.id = b.expenseNameId")
    .select("b.expenseAmount as expenseAmount,b.id as budgetId,sb.budget as budgetAmount,sb.id as budgetAmountId,ex.id as expenseNameId,ex.expense as expenseName,b.createdAt as payDate")
    .where({createdBy:userId})
    .orderBy("b.createdAt", "DESC")
    .execute();
    return data
  }


  async getBudgetAmountId(id: number,userId) {
    let data =await this.setBudgetAmountRepository.createQueryBuilder("ba")
    .select("ba.id as id,ba.budget as budget")
    .where({id:id})
    .andWhere({createdBy:userId})
    .orderBy("ba.createdAt", "DESC")
    .execute();
    return data
  //  return await this.setBudgetAmountRepository.findOne({where:{id:id}})
  }

  async getExpenseNameId(id: number,userId) {
    let data =await this.expensesRepository.createQueryBuilder("ba")
    .select("ba.id as id,ba.expense as expense")
    .where({id:id})
    .andWhere({createdBy:userId})
    .orderBy("b.createdAt", "DESC")
    .execute();
    return data
    // return await this.expensesRepository.findOne({where:{id:id}})
   }

   async getRemainingBudgetId(id: number,userId) {
    console.log(id,'id checsk')
    let data = await this.budgetsRepository.createQueryBuilder("b")
    .leftJoin(setBudgetAmount,"sb","sb.id = b.setAmountId")
    .leftJoin(expenses,"ex","ex.id = b.expenseNameId")
    .select("b.createdAt as payDate,b.expenseAmount as expenseAmount,b.id as budgetId,sb.budget as budgetAmount,sb.id as budgetAmountId,ex.id as expenseNameId,ex.expense as expenseName")
    .where("b.setAmountId = :setAmountId", { setAmountId:id })
    .andWhere("b.createdBy = :createdBy", { createdBy:userId })
    .getRawMany();
    return data
   }


   async getFilterDateWise(id:number,userId){
    if(id == 1){
      console.log('inside 1')
      let data = await this.budgetsRepository.createQueryBuilder("b")
      .leftJoin(setBudgetAmount,"sb","sb.id = b.setAmountId")
      .leftJoin(expenses,"ex","ex.id = b.expenseNameId")
      .select("b.createdAt as payDate,b.expenseAmount as expenseAmount,b.id as budgetId,sb.budget as budgetAmount,sb.id as budgetAmountId,ex.id as expenseNameId,ex.expense as expenseName")
      //today data to get
      .where("DATE(b.createdAt) = CURRENT_DATE")
      .andWhere("b.createdBy = :createdBy", { createdBy:userId })
      .getRawMany();
      return data
    }
    if(id == 2){
      console.log('inside 2')
      let data = await this.budgetsRepository.createQueryBuilder("b")
      .leftJoin(setBudgetAmount,"sb","sb.id = b.setAmountId")
      .leftJoin(expenses,"ex","ex.id = b.expenseNameId")
      .select("b.createdAt as payDate,b.expenseAmount as expenseAmount,b.id as budgetId,sb.budget as budgetAmount,sb.id as budgetAmountId,ex.id as expenseNameId,ex.expense as expenseName")
     //today date to get before 7 days data that is weekly
     .where("DATE(b.createdAt) >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)") // Changed logic to get data for the past 7 days
     .andWhere("b.createdBy = :createdBy", { createdBy:userId })
     .getRawMany();
      return data
    }
    if(id == 3){
      console.log('inside 3')
      let data = await this.budgetsRepository.createQueryBuilder("b")
      .leftJoin(setBudgetAmount,"sb","sb.id = b.setAmountId")
      .leftJoin(expenses,"ex","ex.id = b.expenseNameId")
      .select("b.createdAt as payDate,b.expenseAmount as expenseAmount,b.id as budgetId,sb.budget as budgetAmount,sb.id as budgetAmountId,ex.id as expenseNameId,ex.expense as expenseName")
      //today date to get before 30 days data that is monthly
      .where("DATE(b.createdAt) >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)") // Changed logic to get data for the past 30 days
      .andWhere("b.createdBy = :createdBy", { createdBy:userId })
      .getRawMany();
      return data
    }
   }

  async getBudgetId(id: number,userId) {
    let data = await this.budgetsRepository.createQueryBuilder("b")
    .leftJoin(setBudgetAmount,"sb","sb.id = b.setAmountId")
    .leftJoin(expenses,"ex","ex.id = b.expenseNameId")
    .select("b.expenseAmount as expenseAmount,b.id as budgetId,sb.budget as budgetAmount,sb.id as budgetAmountId,ex.id as expenseNameId,ex.expense as expenseName")
    .where("b.id = :id", { id:id })
    .andWhere("b.createdBy = :createdBy", { createdBy:userId })
    .orderBy("b.createdAt", "DESC")
    .getRawMany();
    return data
   }

   async deleteBudget(id) {
    return await this.budgetsRepository.softDelete(id);
  }

  async expenseCount(userId){
    const countData = await this.budgetsRepository.createQueryBuilder("b")
      .leftJoin("expenses","ex","ex.id = b.expenseNameId")
      .select("ex.id as id, ex.expense as expense, COUNT(ex.expense) as itemCount")
      .where({createdBy:userId})
      .groupBy("ex.id, ex.expense")
      .orderBy("itemCount", "DESC")
      .execute();
    // return countData;
    const topFive = countData.slice(0, 5);
  //Get the remaining categories (including "Other" and "Not Applicable")
  const others = countData.filter(item => !topFive.some(topItem => topItem.expense === item.expense));
  const othersTotalCount = others.reduce((total, item) => total + parseInt(item.itemCount), 0);
  const totalCount = countData.reduce((total, item) => total + parseInt(item.itemCount), 0);
      return { topFive, others,othersTotalCount,totalCount};
  }

  async getExpenseCountToFilterWise(id:number,userId){
    if(id == 1){
      const countData = await this.budgetsRepository.createQueryBuilder("b")
      .leftJoin("expenses","ex","ex.id = b.expenseNameId")
      .select("ex.id as id, ex.expense as expense, COUNT(ex.expense) as itemCount")
      .where("DATE(b.createdAt) = CURRENT_DATE")
      .andWhere("b.createdBy = :createdBy", { createdBy:userId })
      .groupBy("ex.id, ex.expense")
      .orderBy("itemCount", "DESC")
      .execute();
    // return countData;
    const topFive = countData.slice(0, 5);
  //Get the remaining categories (including "Other" and "Not Applicable")
  const others = countData.filter(item => !topFive.some(topItem => topItem.expense === item.expense));
  const othersTotalCount = others.reduce((total, item) => total + parseInt(item.itemCount), 0);
  const totalCount = countData.reduce((total, item) => total + parseInt(item.itemCount), 0);
      return { topFive, others,othersTotalCount,totalCount};
    }
    if(id == 2){
      const countData = await this.budgetsRepository.createQueryBuilder("b")
      .leftJoin("expenses","ex","ex.id = b.expenseNameId")
      .select("ex.id as id, ex.expense as expense, COUNT(ex.expense) as itemCount")
      .where("DATE(b.createdAt) >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)") // Changed logic to get data for the past 7 days
      .andWhere("b.createdBy = :createdBy", { createdBy:userId })
      .groupBy("ex.id, ex.expense")
      .orderBy("itemCount", "DESC")
      .execute();
    // return countData;
    const topFive = countData.slice(0, 5);
  //Get the remaining categories (including "Other" and "Not Applicable")
  const others = countData.filter(item => !topFive.some(topItem => topItem.expense === item.expense));
  const othersTotalCount = others.reduce((total, item) => total + parseInt(item.itemCount), 0);
  const totalCount = countData.reduce((total, item) => total + parseInt(item.itemCount), 0);
      return { topFive, others,othersTotalCount,totalCount};
    }
    if(id == 3){
      const countData = await this.budgetsRepository.createQueryBuilder("b")
      .leftJoin("expenses","ex","ex.id = b.expenseNameId")
      .select("ex.id as id, ex.expense as expense, COUNT(ex.expense) as itemCount")
      .where("DATE(b.createdAt) >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)") // Changed logic to get data for the past 7 days
      .andWhere("b.createdBy = :createdBy", { createdBy:userId })
      .groupBy("ex.id,ex.expense")
      .orderBy("itemCount", "DESC")
      .execute();
    // return countData;
    const topFive = countData.slice(0, 5);
  //Get the remaining categories (including "Other" and "Not Applicable")
  const others = countData.filter(item => !topFive.some(topItem => topItem.expense === item.expense));
  const othersTotalCount = others.reduce((total, item) => total + parseInt(item.itemCount), 0);
  const totalCount = countData.reduce((total, item) => total + parseInt(item.itemCount), 0);
      return { topFive, others,othersTotalCount,totalCount};
    }
  }
  
  

  findAll() {
    return `This action returns all budget`;
  }

  findOne(id: number) {
    return `This action returns a #${id} budget`;
  }

  update(id: number, updateBudgetDto: UpdateBudgetDto) {
    return `This action updates a #${id} budget`;
  }

  remove(id: number) {
    return `This action removes a #${id} budget`;
  }
}
