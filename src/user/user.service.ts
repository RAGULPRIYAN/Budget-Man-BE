import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;
  private jwtService: JwtService

  async signUp(userData: any) {
    if (!userData.name) {
      return { status: false, message: 'Name Cannot Be Null' };
    }

    if (!userData.email) {
      return { status: false, message: 'Email Cannot Be Null' };
    }

    try {
      const existingUser = await this.userRepository.findOne({ where: { email: userData.email } });
      if (!existingUser) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const payload = {
          name: userData.name,
          email: userData.email,
          socialId: null,
          userLoginType: '1',
          roleId: 1,
          password: hashedPassword,
        };

        const userCreate = await this.userRepository.save(payload);

        const userDataEmail = await this.userRepository.findOne({ where: { email: userData.email } });
        const payload1 = {
          id: userDataEmail.id,
          email: userDataEmail.email,
        };

        // const token = this.jwtService.sign(payload1);

        // await this.userRepository.update({ id: userDataEmail.id }, { uuidToken: token });

        return {
          status: true,
          message: 'Signed Up Successfully And Check Your Mail And Verify It',
        };
      } else {
        return { status: false, message: 'Email Is Already Exists' };
      }
    } catch (error) {
      console.error('Error during user creation:', error);
      return { status: false, message: 'Error during user creation' };
    }
  }


  async login(loginData) {
    let email = loginData['email'];
    let user = await this.userRepository.findOne({ where: { email: loginData.email } });
    if (!user) {
      return { success: false, message: 'Email And Password Are Invalid' };
    } else {
      let prof = await this.userRepository
        .createQueryBuilder('user')
     
        .select(['user.name', 'user.email'])
        .where('user.id = :id', { id: user.id })
        .getRawOne();
     
      let isPassword = await bcrypt.compare(
        loginData['password'],
        user.password,
      );
      if (isPassword) {
        let payload = {
          id: user.id,
          email: user.email,
        };

        // let accessToken = this.jwtService.sign(payload);
        return {
          status: 1,
          // token: accessToken,
          message: 'Login Successfully',
          userid: user.id,
          name: user.name,
        
          
        };
      } else {
        return { success: false, message: 'Email And Password Is Invalid' };
      }
    }
  }

  async getUserId(id){
    return  await this.userRepository.findOne({where:{id}})
  }

  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
