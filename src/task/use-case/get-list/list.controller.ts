import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { TaskService } from 'src/task/services/task.service';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';

@Controller('task')
export class GetAllTaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/list')
  async findAll(@Res() response): Promise<CreateTaskDto> {
    try {
      const result = await this.taskService.findAll();
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'retrieve all task successfully',
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
