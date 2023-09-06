import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('add')
  async create(
    @Res() response,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const result = await this.projectService.create(createProjectDto);
    return response
      .status(200)
      .json({ message: 'Create project successfully', data: result });
  }

  @Get('list')
  async findAll(
    @Res() response,
    @Query() query: ExpressQuery,
  ): Promise<Project[]> {
    try {
      const result = await this.projectService.findAll(query);
      console.log('result phyit pr tl', result);
      return response
        .status(200)
        .json({ message: 'Retrieve all project successfully', data: result });
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'Retrieve all projects failed' });
    }
  }

  @Get('detail/:id')
  async findOne(@Res() response, @Param('id') id: string): Promise<Project> {
    const result = await this.projectService.findOne(id);
    return response
      .status(200)
      .json({ message: 'Retrieve project successfully', data: result });
  }

  @Patch('edit/:id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const result = await this.projectService.update(id, createProjectDto);
    return response
      .status(200)
      .json({ message: 'Update project successfully', data: result });
  }

  @Delete('delete/:id')
  async remove(@Res() response, @Param('id') id: string): Promise<Project> {
    const result = await this.projectService.remove(id);
    return response
      .status(200)
      .json({ message: 'Delete project successfully', data: result });
  }
}
