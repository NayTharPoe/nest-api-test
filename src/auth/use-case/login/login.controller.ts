import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from '../../auth.service';
import { ApiTags } from '@nestjs/swagger/dist';
import { LoginRequestDto } from './login-req.dto';

@Controller('auth')
@ApiTags('Login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginRequestDto) {
    const { email, password } = loginDto;
    return this.authService.login(email, password);
  }
}
