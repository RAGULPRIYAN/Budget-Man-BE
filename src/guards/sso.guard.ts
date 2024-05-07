import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BasicGuard } from './basic.guard';
import { UserService } from '../user/user.service';


@Injectable()
export class SSOGuard extends BasicGuard implements CanActivate {
    constructor(
        protected readonly userService: UserService,
        protected readonly reflector: Reflector,
    ) {
        super(reflector, userService);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) {
            return true;
        }
        const req = context.switchToHttp().getRequest();
       
        if (req.headers['authorization']) {
            try {
                let bearerToken = req.headers['authorization'].split('Bearer ')[1]
                return await super.canActivate(context)
            }
            catch (error) {
                return await super.canActivate(context)
            }
        }
        throw new UnauthorizedException();

    }
}
