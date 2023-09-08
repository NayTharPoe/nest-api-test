import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from '../../auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Send password reset link')
export class SendResetPasswordLinkController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sent-reset-password-link')
  async login(@Body() reqBody) {
    return this.authService.sendResetPasswordLink(reqBody);
  }
}
