import { PartialType } from '@nestjs/mapped-types';
import { CreateReportDto } from './create-report-req.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {}
