import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskEntity, TaskSchema } from './entities/task.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TaskEntity.name, schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
