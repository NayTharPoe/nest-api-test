import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfigFactory } from './config/database.config';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ReportModule } from './report/report.module';
import { TaskModule } from './task/task.module';


@Module({
  imports: [
    ItemModule,
    ProjectModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mongooseConfigFactory,
      inject: [ConfigService],
    }),
    ReportModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
