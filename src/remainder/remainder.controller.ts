import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, Put } from '@nestjs/common';
import { RemainderService } from './remainder.service';
import { CreateRemainderDto } from './dto/create-remainder.dto';
import { UpdateRemainderDto } from './dto/update-remainder.dto';
import { Request, Response } from "express";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('remainder')
@ApiBearerAuth()
@ApiTags("remainder")
export class RemainderController {
  constructor(private readonly remainderService: RemainderService) {}


  @Post("addRemainder")
  async addRemainder(
    @Body() data: any,
    @Res() res: Response,
    @Req() req: Request
  ) {
  
    try {
      let userId = req["user"]["id"];
      data['createdBy'] =userId
      const result = await this.remainderService.createRemainder(data);
  
      res.status(HttpStatus.OK).json({
        message: "addRemainder Added Successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An Error Occurred" });
    }
  }

  @Put("updateRemainder/:id")
  async updateRemainder(
    @Body() data: any,
    @Res() res: Response,
    @Req() req: Request,
    @Param("id") id: number
  ) {
    
    try {
      let userId = req["user"]["id"];
      data['updatedBy'] =userId
      const result = await this.remainderService.updateRemainder(id, data);
      res
        .status(HttpStatus.OK)
        .json({ message: "Successfully Remainder Updated", data: result });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An error occurred" });
    }
  }


  @Get("getRemainder")
  async getRemainder(
    // @Param("id") id: number,
    @Body() data: any,
    @Res() res: Response,
    @Req() req: Request
  ) {
   
    try {
      let userId = req["user"]["id"];
      const results = await this.remainderService.getRemainder(userId);
     
      res.status(HttpStatus.OK).json({
        message: "Successfully  get Remainder",
        data: results,
      });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An Error Occurred" });
    }
  }

  @Get("getFilter")
  async getFilter(
    // @Param("id") id: number,
    @Body() data: any,
    @Res() res: Response,
    @Req() req: Request
  ) {
   
    try {
     
      const results = await this.remainderService.getFilter();
     
      res.status(HttpStatus.OK).json({
        message: "Successfully  get Filter",
        data: results,
      });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An Error Occurred" });
    }
  }

  @Get("getRemainderId/:id")
  async getRemainderId( @Body() body: any, @Res() res: Response,@Param("id") id: number,@Req() req: Request) {
    
    try {
      let userId = req["user"]["id"];
      const result = await this.remainderService.getRemainderId(id,userId);
      res
        .status(HttpStatus.OK)
        .json({ message: " Get Remainder Id Successfully ", data: result });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An error occurred" });
    }
  }

  @Get("getRemainderWiseBudgetId/:id")
  async getRemainderWiseBudgetId( @Body() body: any, @Res() res: Response,@Param("id") id: number,@Req() req: Request) {
    
    try {
      let userId = req["user"]["id"];
      const result = await this.remainderService.getRemainderWiseBudgetId(id,userId);
      res
        .status(HttpStatus.OK)
        .json({ message: " Get getRemainderWiseBudgetId  Successfully ", data: result });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An error occurred" });
    }
  }

  @Delete("deleteRemainder/:id")
  async deleteRemainder(
    @Body() body: any,
    @Res() res: Response,
    @Param("id") id: number,
    @Req() req: Request
  ) {
    
    try {
      const result = await this.remainderService.deleteRemainder(id);
      res
        .status(HttpStatus.OK)
        .json({ message: "Remainder Deleted Successfully", data: result });
    } catch (error) {
      console.log(error);
    
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An Error Occurred" });
    }
  }


  @Post()
  create(@Body() createRemainderDto: CreateRemainderDto) {
    return this.remainderService.create(createRemainderDto);
  }

  @Get()
  findAll() {
    return this.remainderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remainderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRemainderDto: UpdateRemainderDto) {
    return this.remainderService.update(+id, updateRemainderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remainderService.remove(+id);
  }
}
