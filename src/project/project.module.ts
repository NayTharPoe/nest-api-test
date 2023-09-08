import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectEntity, ProjectSchema } from './entities/project.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProjectEntity.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
