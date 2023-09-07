import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ReportService } from 'src/report/services/report.service';
import { ListReportResponseDto } from './list-report-res.dto';

@Controller('report')
export class GetAllReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/list')
  async findAll(@Res() response): Promise<ListReportResponseDto[]> {
    try {
      const result = await this.reportService.findAll();
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'retrieve all report successfully',
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
