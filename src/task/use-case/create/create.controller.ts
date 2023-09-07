import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { TaskService } from 'src/task/services/task.service';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';

@Controller('task')
export class CreateTaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/add')
  async create(@Res() response, @Body() createTaskDto: CreateTaskDto) {
    try {
      const result = await this.taskService.create(createTaskDto);
      return response.status(HttpStatus.CREATED).json({
        statusCode: 200,
        message: 'created task successfully',
        data: result,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: error?.status,
        message: error.response?.message,
      });
    }
  }
}
