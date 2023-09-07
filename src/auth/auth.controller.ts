import { Controller, Req, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Req() req) {
    const { email, password } = req.body;
    return this.authService.login(email, password);
  }
}
