import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1D' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
