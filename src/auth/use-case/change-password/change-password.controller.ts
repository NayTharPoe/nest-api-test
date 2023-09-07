import { Controller, Body, Post, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../auth.service';

@Controller('auth')
export class ChagnePasswordController {
  constructor(private readonly authService: AuthService) {}

  @Post('/change-password')
  async login(@Body() reqBody, @Res() response) {
    const result = this.authService.changePassword(reqBody);
    return response.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'change password successfully',
      data: result,
    });
  }
}
