import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('add')
  async create(@Res() response, @Body() createTaskDto: CreateTaskDto) {
    const result = await this.taskService.create(createTaskDto);
    return response.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'create task successfully',
      data: result,
    });
  }

  @Get('list')
  async findAll(@Res() response) {
    const result = await this.taskService.findAll();
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'retrieve all task successfully',
      data: result,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.taskService.update(+id, updateTaskDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
