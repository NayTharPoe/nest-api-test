import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TaskDocument, TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskEntity.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    const newTask = new this.taskModel(createTaskDto);
    await newTask.save();
    return newTask;
  }

  async findAll() {
    const tasks = await this.taskModel
      .find()
      .populate([
        { path: 'project', select: '_id projectName' },
        { path: 'assignedEmployee', select: '_id name' },
      ])
      .select('-__v')
      .sort({ createdAt: -1 });
    return tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  // update(id: number, updateTaskDto: UpdateTaskDto) {
  //   return `This action updates a #${id} task`;
  // }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
