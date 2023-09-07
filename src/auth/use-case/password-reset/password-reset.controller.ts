import { Controller, Body, Post, Res, Param } from '@nestjs/common';
import { AuthService } from '../../auth.service';

@Controller('auth')
export class PasswordResetController {
  constructor(private readonly authService: AuthService) {}

  @Post('/reset-password/:token')
  async login(
    @Param('token') token: string,
    @Body() reqBody: any,
    @Res() res: Response,
  ) {
    return this.authService.passwordReset(reqBody, token);
  }
}
