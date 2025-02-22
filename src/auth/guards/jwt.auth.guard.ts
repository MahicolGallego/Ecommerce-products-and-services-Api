import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwtStrategy') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const handler = context.getHandler();
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, handler);

    if (isPublic) return true;

    //if it´s not public, evaluate the bearer token
    return super.canActivate(context) as Promise<boolean>;
  }
}
