import { Injectable, HttpException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TaskDocument, TaskEntity } from '../entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task')
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    const newTask = new this.taskModel(createTaskDto);
    const data = await newTask.save();
    console.log(data);
    return data;
  }

  async findAll(): Promise<TaskDocument[]> {
    const result = await this.taskModel
      .find()
      .populate('project', '_id projectName')
      .populate('assignedEmployee', '_id name')
      .select('-__v')
      .sort({ createdAt: -1 })
      .exec();

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
