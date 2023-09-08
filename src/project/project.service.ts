import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectEntity, projectDocument } from './entities/project.entity';
import { Query } from 'express-serve-static-core';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(ProjectEntity.name) private readonly projectModel: Model<projectDocument>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    stackFile?: Express.Multer.File,
  ): Promise<ProjectEntity> {
    const newProject = new this.projectModel({
      ...createProjectDto,
      stack: stackFile?.originalname,
    });
    return await newProject.save();
  }

  async findAll(query: Query) {
    const resPerPage = Number(query.limit);
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const data = await this.projectModel
      .find()
      .limit(resPerPage)
      .skip(skip)
      .sort({ createdAt: -1 })
      .select('-__v');

    const totalProjects = await this.projectModel.countDocuments();
    const result = { data, totalProjects };
    return result;
  }

  async findOne(id: string) {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new HttpException('not found project', HttpStatus.NOT_FOUND);
    }

    return project;
  }

  async update(
    id: string,
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new HttpException(
        'Not found project to edit',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.projectModel.findByIdAndUpdate(id, createProjectDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new HttpException(
        'Not found project to delete',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.projectModel.findByIdAndDelete(id);
  }
}
