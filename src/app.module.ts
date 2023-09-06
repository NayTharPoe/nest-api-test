import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config/key';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ItemModule,
    ProjectModule,
    MongooseModule.forRoot(config.MONGO_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
