import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

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
}
