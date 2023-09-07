import {
  Controller,
  Patch,
  Param,
  HttpStatus,
  Res,
  Body,
} from '@nestjs/common';
import { CreateReportDto } from 'src/report/dto/create-report-req.dto';
import { ReportService } from 'src/report/services/report.service';

@Controller('report')
export class UpdateReportController {
  constructor(private readonly reportService: ReportService) {}

  @Patch('edit/:id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateReportDto: CreateReportDto,
  ): Promise<CreateReportDto> {
    try {
      const result = await this.reportService.update(id, updateReportDto);
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'report update successfully',
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
