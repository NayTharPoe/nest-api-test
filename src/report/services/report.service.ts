import { Injectable, HttpException } from '@nestjs/common';
import { CreateReportDto } from '../dto/create-report-req.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ReportDocument, ReportEntity } from '../entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(ReportEntity.name)
    private readonly reportModel: Model<ReportDocument>,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<ReportDocument> {
    const report = new this.reportModel(createReportDto);
    await report.save();
    return report;
  }

  async findAll(): Promise<ReportDocument[]> {
    const result = await this.reportModel
      .find()
      .select('-__v')
      .sort({ createdAt: -1 });
    return result;
  }

  async findOne(id: string): Promise<ReportDocument> {
    const report = await this.reportModel.findById(id);
    if (!report) {
      throw new HttpException('Not found report with this id', 404);
    }
    return report;
  }

  async update(
    id: string,
    updateReportDto: CreateReportDto,
  ): Promise<ReportDocument> {
    const report = await this.reportModel.findById(id);
    if (!report) {
      throw new HttpException('Not found report with this id', 404);
    }
    const updatedReport = await this.reportModel.findByIdAndUpdate(
      id,
      updateReportDto,
      {
        new: true,
      },
    );

    return updatedReport;
  }

  async remove(id: string): Promise<ReportDocument> {
    const report = await this.reportModel.findById(id);
    if (!report) {
      throw new HttpException('Not found report with this id', 404);
    }

    const deletedUser = await this.reportModel.findByIdAndRemove(id);
    return deletedUser;
  }
}
