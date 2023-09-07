import { Injectable, HttpException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TaskDocument, TaskEntity } from '../entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskEntity.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = new this.taskModel(createTaskDto);
    return await newTask.save();
  }

  async findAll(): Promise<TaskDocument[]> {
    const result = await this.taskModel
      .find()
      .select('-__v')
      .sort({ createdAt: -1 });
    return result;
  }

  async findOne(id: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new HttpException('Not found task with this id', 404);
    }
    return task;
  }

  async update(
    id: string,
    updateTaskDto: CreateTaskDto,
  ): Promise<TaskDocument> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new HttpException('Not found task with this id', 404);
    }
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      updateTaskDto,
      {
        new: true,
      },
    );

    return updatedTask;
  }

  async remove(id: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new HttpException('Not found task with this id', 404);
    }

    const deletedTask = await this.taskModel.findByIdAndRemove(id);
    return deletedTask;
  }
}
