import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskEntity, TaskSchema } from './entities/task.entity';
import { CreateTaskController } from './use-case/create/create.controller';
import { GetAllTaskController } from './use-case/get-list/list.controller';
import { EditTaskController } from './use-case/edit/edit.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
  ],
  controllers: [CreateTaskController, GetAllTaskController, EditTaskController],
  providers: [TaskService],
})
export class TaskModule {}
