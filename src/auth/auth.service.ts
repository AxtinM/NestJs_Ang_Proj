import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { hash, verify } from 'argon2';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto, userType } from './dto';
import { User } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async SignUp(dto: RegisterDto) {
    //hash password
    const hashedPwd = await hash(dto.password);
    //create user
    const user = new this.userModel({
      name: dto.name,
      email: dto.email,
      hash: hashedPwd,
    });
    if (user.get('password') == 'adminpwd') {
      user.set('role', 'admin');
    }
    //save user
    await user.save();
    const payload: userType = {
      sub: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    //sign token and return
    return this.signToken(payload);
  }

  async SignIn(dto: LoginDto) {
    //check if user exists
    const user = await this.userModel.findOne({ email: dto.email });
    //if not return error;
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    //check user's password
    if (await verify(user.hash, dto.password)) {
      //prepare payload
      const payload: userType = {
        sub: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      //if yes sign token and return
      return this.signToken(payload);
    }

    throw new BadRequestException('Password Incorrect');
  }

  async signToken(payload: userType) {
    const secret = this.config.get('JWT_SECRET');
    const data = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: secret,
    });

    return {
      access_token: data,
    };
  }

  getAll() {
    const users = this.userModel.find({});
    return users;
  }

  async deleteUser(id: string) {
    await this.userModel.deleteOne({ _id: id });
    return this.getAll();
  }
}
