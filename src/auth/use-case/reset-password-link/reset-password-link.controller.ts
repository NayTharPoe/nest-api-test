import { Controller, Body, Post, Res } from '@nestjs/common';
import { AuthService } from '../../auth.service';

@Controller('auth')
export class SendResetPasswordLinkController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sent-reset-password-link')
  async login(@Body() reqBody, @Res() response) {
    return this.authService.sendResetPasswordLink(reqBody);
  }
}
