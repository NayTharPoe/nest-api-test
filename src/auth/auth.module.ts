import { Module } from '@nestjs/common';
import { LoginController } from './use-case/login/login.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';
import { ChagnePasswordController } from './use-case/change-password/change-password.controller';
import { SendResetPasswordLinkController } from './use-case/reset-password-link/reset-password-link.controller';
import { PasswordResetController } from './use-case/password-reset/password-reset.controller';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1D' },
    }),
  ],
  controllers: [
    LoginController,
    ChagnePasswordController,
    SendResetPasswordLinkController,
    PasswordResetController,
  ],
  providers: [AuthService, UserService],
})
export class AuthModule {}
