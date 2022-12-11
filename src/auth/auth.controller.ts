import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/AuthDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  signin(@Body() dto: LoginDto) {
    return this.authService.SignIn(dto);
  }

  @Post('register')
  singup(@Body() dto: RegisterDto) {
    return this.authService.SignUp(dto);
  }

  @Get('test')
  getAll() {
    return this.authService.getAll();
  }

  @Get('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }
}
