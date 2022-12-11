import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class RoleStrategy extends PassportStrategy(Strategy, 'role') {
  constructor() {
    super(async (payload, done) => {
      try {
        const user = payload.user;
        if (user && user.role == 'admin') {
          return done(null, user);
        }
        return done(new UnauthorizedException(), false);
      } catch (error) {
        return done(error, false);
      }
    });
  }
}
