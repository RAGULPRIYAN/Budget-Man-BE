import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports :[ JwtModule.register({
    secret: config.jwt.secretOrKey, // Replace with your actual secret key
    signOptions: { expiresIn: '1d' }, // Adjust expiration as needed
  })
  ,TypeOrmModule.forFeature([
    User
     ])],
     exports:[UserService],

})
export class UserModule {}
