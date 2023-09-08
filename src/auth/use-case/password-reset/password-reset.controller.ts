import { Controller, Body, Post, Param } from '@nestjs/common';
import { AuthService } from '../../auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Password reset')
export class PasswordResetController {
  constructor(private readonly authService: AuthService) {}

  @Post('/reset-password/:token')
  async login(
    @Param('token') token: string,
    @Body() reqBody: any,
  ) {
    return this.authService.passwordReset(reqBody, token);
  }
}
