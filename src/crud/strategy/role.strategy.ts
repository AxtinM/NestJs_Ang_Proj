import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RoleStrategy extends AuthGuard('role') {
  canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.role == 'admin') {
      return true;
    }

    throw new UnauthorizedException();
  }
}
