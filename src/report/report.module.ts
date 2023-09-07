import { Module } from '@nestjs/common';
import { ReportService } from './services/report.service';
import { CreateReportController } from './use-case/create/create.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportEntity, ReportSchema } from './entities/report.entity';
import { GetReportController } from './use-case/detail/detail.controller';
import { UpdateReportController } from './use-case/update/update.controller';
import { DeleteReportController } from './use-case/delete/delete.controller';
import { GetAllReportController } from './use-case/get-list/list.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReportEntity.name, schema: ReportSchema },
    ]),
  ],
  controllers: [
    CreateReportController,
    GetReportController,
    GetAllReportController,
    UpdateReportController,
    DeleteReportController,
  ],
  providers: [ReportService],
})
export class ReportModule {}
