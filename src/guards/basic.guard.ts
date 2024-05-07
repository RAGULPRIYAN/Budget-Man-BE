import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';
import config from '../config';

@Injectable()
export class BasicGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const req = context.switchToHttp().getRequest();
      let isPublic = this.reflector.get('isPublic', context.getHandler());
      if (isPublic) {
        return true;
      }
      var decoded = jwt.verify(
        req.headers['authorization'].split('Bearer ')[1],
        config.jwt.secretOrKey,
      );
 
      if (decoded) {
        req['user'] = {
          id: decoded['id'],
          // currentRole: role[0].currentRole
        };
     
        return true;
      }
      throw new UnauthorizedException();
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
