import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { Query } from 'express-serve-static-core';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project') private readonly projectModel: Model<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = new this.projectModel(createProjectDto);
    return await newProject.save();
  }

  async findAll(query: Query) {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const data = await this.projectModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip)
      .sort({ createdAt: -1 })
      .select('-__v');
    return data;
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
  ): Promise<Project> {
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
