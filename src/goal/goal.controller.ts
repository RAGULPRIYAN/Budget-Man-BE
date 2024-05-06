import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, Put } from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Request, Response } from "express";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('goal')
@ApiBearerAuth()
@ApiTags("goal")

export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post("addGoal")
  async addGoal(
    @Body() data: any,
    @Res() res: Response,
    @Req() req: Request
  ) {
  
    try {
      const result = await this.goalService.createGoal(data);
  
      res.status(HttpStatus.OK).json({
        message: "addGoal Added Successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An Error Occurred" });
    }
  }

  @Put("updateGoal/:id")
  async updateGoal(
    @Body() data: any,
    @Res() res: Response,
    @Req() req: Request,
    @Param("id") id: number
  ) {
    
    try {
      const result = await this.goalService.updateGoal(id, data);
      res
        .status(HttpStatus.OK)
        .json({ message: "Successfully Goal Updated", data: result });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An error occurred" });
    }
  }


  @Get("getGoals")
  async getGoals(
    // @Param("id") id: number,
    @Body() data: any,
    @Res() res: Response,
    @Req() req: Request
  ) {
   
    try {
      const results = await this.goalService.getGoal();
     
      res.status(HttpStatus.OK).json({
        message: "Successfully  get Goals",
        data: results,
      });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An Error Occurred" });
    }
  }

  @Get("getGoalId/:id")
  async getGoalId( @Body() body: any, @Res() res: Response,@Param("id") id: number,@Req() req: Request) {
    
    try {
      const result = await this.goalService.getGoalId(id);
      res
        .status(HttpStatus.OK)
        .json({ message: " Get Goal Id Successfully ", data: result });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An error occurred" });
    }
  }

  @Delete("deleteGoal/:id")
  async deleteGoal(
    @Body() body: any,
    @Res() res: Response,
    @Param("id") id: number,
    @Req() req: Request
  ) {
    
    try {
      const result = await this.goalService.deleteGoal(id);
      res
        .status(HttpStatus.OK)
        .json({ message: "Goal Deleted Successfully", data: result });
    } catch (error) {
      console.log(error);
    
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An Error Occurred" });
    }
  }



  @Post()
  create(@Body() createGoalDto: CreateGoalDto) {
    return this.goalService.create(createGoalDto);
  }

  @Get()
  findAll() {
    return this.goalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalService.update(+id, updateGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalService.remove(+id);
  }
}
