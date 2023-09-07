import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/utils/send-email';
import { generateResetPasswordTemplate } from 'src/helpers/templates/resetpass-email.template';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compareSync(password, user.password))) {
      const payload = {
        email,
        sub: user._id,
      };

      return {
        message: 'Login successfully',
        access_token: await this.jwtService.sign(payload),
        data: payload,
      };
    } else {
      throw new UnauthorizedException('Incorrect password');
    }
  }

  async changePassword(reqBody: any): Promise<any> {
    const { email, oldPassword, newPassword, confirmPassword } = reqBody;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    const passwordMatch = await bcrypt.compareSync(oldPassword, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('password not match with your password');
    }

    if (oldPassword === newPassword && confirmPassword) {
      throw new UnauthorizedException(
        'new password should not be same as old password',
      );
    }

    if (newPassword === confirmPassword) {
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      const updatedUser = {
        ...reqBody,
        hashedPassword,
      };

      return await this.userService.update(user._id, updatedUser);
    } else {
      throw new UnauthorizedException(
        'new password and confirm password not match',
      );
    }
  }

  async sendResetPasswordLink(reqBody: { email: string }): Promise<any> {
    const { email } = reqBody;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('There is no user with this email!');
    }

    const resetToken = this.jwtService.sign({ email }, { expiresIn: '24h' });
    const resetLink = `${process.env.CLIENT_DOMAIN}/reset-password?token=${resetToken}`;

    const emailContent = generateResetPasswordTemplate(
      user.name,
      email,
      resetLink,
    );

    await EmailService.sendEmail(email, 'Password Reset Link', emailContent);

    return {
      statusCode: HttpStatus.OK,
      message: 'Reset password link sent successfully',
    };
  }

  async passwordReset(reqBody: any, token: string): Promise<any> {
    const { newPassword, confirmPassword } = reqBody;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException(
        'New password and confirm password must match',
      );
    }

    const decodedToken = this.jwtService.verify(token) as { email: string };
    const user = await this.userService.findByEmail(decodedToken.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hashSync(newPassword, saltRounds);

    user.password = hashedPassword;
    const result = await this.userService.update(user.id, {
      password: hashedPassword,
    });

    return {
      statusCode: 200,
      message: 'Your password has been successfully reset',
      data: result,
    };
  }
}
