import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from "express";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/isPublic';

@Controller('user')
@ApiBearerAuth()
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  @Public()
  async signUp(@Body() userData: any, @Res() res: Response) {
    try {
      console.log('inside',userData)
      let signUp = await this.userService.signUp(userData);
      if (signUp.status) {
       
        res.status(HttpStatus.OK).json({
          success: true,
          message: signUp.message,
        });
      } else {
       
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: signUp.message,
        });
      }
    } catch (error) {
      console.log(error);
      
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: 'Error In Creating User',
      });
    }
  }


  @Post('login')
  @Public()
  async login(@Body() loginData: any, @Res() res: Response) {
    try {
      let verfied = await this.userService.login(loginData);
      if (verfied.status) {
      
        res.status(HttpStatus.OK).json({
          success: true,
          message: verfied.message,
          token: verfied.token,
          userid: verfied.userid,
          name: verfied.name,
          email: loginData.email
        });
        // await admin.messaging().sendToDevice('', admin.messaging.MessagingPayload);
      } else {
      
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: verfied.message,
        });
      }
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: 'Invalid Username or Password',
      });
    }
  }

  @Get("getUserId/:id")
  async getUserId( @Body() body: any, @Res() res: Response,@Param("id") id: number,@Req() req: Request) {
    
    try {
      const result = await this.userService.getUserId(id);
      res
        .status(HttpStatus.OK)
        .json({ message: " Get User Id Successfully ", data: result });
    } catch (error) {
      console.log(error);
     
      res.status(HttpStatus.BAD_REQUEST).json({ message: "An error occurred" });
    }
  }
  

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
