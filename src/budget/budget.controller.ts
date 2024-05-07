import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, Put } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Request, Response } from "express";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('budget')
@ApiBearerAuth()
@ApiTags("budget")


export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetService.create(createBudgetDto);
  }

  // @Get()
  // findAll() {
  //   return this.budgetService.findAll();
  // }


  @Post("addBudgetAmount")
  async addBudgetAmount(
    @Body() data: any,
    @Res() res: Response,
    @Req() req: Request
  ) {
  
    try {
      let userId = req["user"]["id"];
      data['createdBy'] =userId
      const result = await this.budgetService.createBudgetAmount(data);
     
      res.status(HttpStatus.OK).json({
        message: "addBudgetAmount Added Successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An Error Occurred" });
    }
  }


  @Post("addExpenseName")
  async addExpenseName(
    @Body() data: any,
    @Res() res: Response,
    @Req() req: Request
  ) {
  
    try {
      let userId = req["user"]["id"];
      data['createdBy'] =userId
      const result = await this.budgetService.createExpenseNames(data);
     
      res.status(HttpStatus.OK).json({
        message: "addExpenseName Added Successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An Error Occurred" });
    }
  }

  @Post("addBudgets")
  async addBudgets(
    @Body() data: any,
    @Res() res: Response,
    @Req() req: Request
  ) {
  
    try {
      let userId = req["user"]["id"];
      data['createdBy'] =userId
      const result = await this.budgetService.createBudget(data);
     
      res.status(HttpStatus.OK).json({
        message: "addBudgets Added Successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An Error Occurred" });
    }
  }


  @Put("updateBudget/:id")
  async updateBudget(
    @Body() data: any,
    @Res() res: Response,
    @Req() req: Request,
    @Param("id") id: number
  ) {
    
    try {
      let userId = req["user"]["id"];
      data['updatedBy'] =userId
      const result = await this.budgetService.updateBudget(id, data);
      res
        .status(HttpStatus.OK)
        .json({ message: "Successfully Budget Updated", data: result });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An error occurred" });
    }
  }

  @Delete("deleteBudget/:id")
  async deleteBudget(
    @Body() body: any,
    @Res() res: Response,
    @Param("id") id: number,
    @Req() req: Request
  ) {
    
    try {
      const result = await this.budgetService.deleteBudget(id);
      res
        .status(HttpStatus.OK)
        .json({ message: "Budget Deleted Successfully", data: result });
    } catch (error) {
      console.log(error);
    
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An Error Occurred" });
    }
  }

  @Get("getExpenseCount")
  async getExpenseCount(
    // @Param("id") id: number,
    @Body() data: any,
    @Res() res: Response,
    @Req() req: Request
  ) {
   
    try {
      let userId = req["user"]["id"];
      const results = await this.budgetService.expenseCount(userId);
     
      res.status(HttpStatus.OK).json({
        message: "Successfully  get Expense Count",
        data: results,
      });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An Error Occurred" });
    }
  }

  @Get("getAllBudgetAmount")
  async getAllBudgetAmount(@Res() res: Response, @Req() req: Request){
    // let userId = req['user']['id'];
    try {
      let userId = req["user"]["id"];
      const results = await this.budgetService.getAllBudgetAmount(userId);
      res.status(HttpStatus.OK).json({
        message: "Successfully  Get All Budget Amount",
        data: results,
      });
    } catch (error) {
      console.log(error);
    
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An Error Occurred" });
    }
  }  


  @Get("getAllBudgetName")
  async getAllBudgetName(@Res() res: Response, @Req() req: Request){
    try {
      let userId = req["user"]["id"];
      const results = await this.budgetService.getAllBudgetName(userId);
    
      res.status(HttpStatus.OK).json({
        message: "Successfully  Get All Budget Name",
        data: results,
      });
    } catch (error) {
      console.log(error);
    
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An Error Occurred" });
    }
  } 

  @Get("getAllBudgets")
  async getAllBudgets(@Res() res: Response, @Req() req: Request){
    try {
      let userId = req["user"]["id"];
      const results = await this.budgetService.getAllBudgets(userId);
    
      res.status(HttpStatus.OK).json({
        message: "Successfully  Get All Budgets",
        data: results,
      });
    } catch (error) {
      console.log(error);
    
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An Error Occurred" });
    }
  } 


  @Get("getAmountId/:id")
  async getAmountId( @Body() body: any, @Res() res: Response,@Param("id") id: number,@Req() req: Request) {
    
    try {
      let userId = req["user"]["id"];
      const result = await this.budgetService.getBudgetAmountId(id,userId);
      res
        .status(HttpStatus.OK)
        .json({ message: " Get Amount Id Successfully ", data: result });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An error occurred" });
    }
  }

  @Get("getExpenseNamesId/:id")
  async getExpenseNamesId( @Body() body: any, @Res() res: Response,@Param("id") id: number,@Req() req: Request) {
    
    try {
      let userId = req["user"]["id"];
      const result = await this.budgetService.getExpenseNameId(id,userId);
      res
        .status(HttpStatus.OK)
        .json({ message: " Get getExpenseNamesId Successfully ", data: result });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An error occurred" });
    }
  }

   @Get("getRemainingBudgetId/:id")
  async getRemainingBudgetId( @Body() body: any, @Res() res: Response,@Param("id") id: number,@Req() req: Request) {
    
    try {
      let userId = req["user"]["id"];
      const result = await this.budgetService.getRemainingBudgetId(id,userId);
      res
        .status(HttpStatus.OK)
        .json({ message: " Get getRemainingBudgetId Successfully ", data: result });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An error occurred" });
    }
  }

  @Get("getBudgetId/:id")
  async getBudgetId( @Body() body: any, @Res() res: Response,@Param("id") id: number,@Req() req: Request) {
    
    try {
      let userId = req["user"]["id"];
      const result = await this.budgetService.getBudgetId(id,userId);
      res
        .status(HttpStatus.OK)
        .json({ message: " Get getBudgetId Successfully ", data: result });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An error occurred" });
    }
  }

  @Get("getFilterDateId/:id")
  async getFilterDateId( @Body() body: any, @Res() res: Response,@Param("id") id: number,@Req() req: Request) {
    
    try {
      let userId = req["user"]["id"];
      const result = await this.budgetService.getFilterDateWise(id,userId);
      res
        .status(HttpStatus.OK)
        .json({ message: " Get getFilterDateId Successfully ", data: result });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An error occurred" });
    }
  }

  @Get("getExpenseCountFilterDateId/:id")
  async getExpenseCountFilterDateId( @Body() body: any, @Res() res: Response,@Param("id") id: number,@Req() req: Request) {
    
    try {
      let userId = req["user"]["id"];
      const result = await this.budgetService.getExpenseCountToFilterWise(id,userId);
      res
        .status(HttpStatus.OK)
        .json({ message: " Get getExpenseCountFilterDateId Successfully ", data: result });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An error occurred" });
    }
  }




  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
    return this.budgetService.update(+id, updateBudgetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetService.remove(+id);
  }
}
