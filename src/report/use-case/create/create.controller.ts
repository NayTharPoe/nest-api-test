import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { ReportService } from '../../services/report.service';
import { CreateReportDto } from '../../dto/create-report-req.dto';

@Controller('report')
export class CreateReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('add')
  async create(@Res() response, @Body() createReportDto: CreateReportDto): Promise<CreateReportDto> {
    try {
      const result = await this.reportService.create(createReportDto);
      return response.status(HttpStatus.CREATED).json({
        statusCode: 200,
        message: 'report created successfully',
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
