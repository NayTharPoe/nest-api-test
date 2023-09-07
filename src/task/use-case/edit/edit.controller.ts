import {
  Controller,
  Body,
  Patch,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { TaskService } from 'src/task/services/task.service';

@Controller('task')
export class EditTaskController {
  constructor(private readonly taskService: TaskService) {}

  @Patch('edit/:id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateTaskDto: CreateTaskDto,
  ) {
    try {
      const result = await this.taskService.update(id, updateTaskDto);
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'updated task successfully',
        data: result,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: error.status,
        message: error.response.message,
      });
    }
  }
}
