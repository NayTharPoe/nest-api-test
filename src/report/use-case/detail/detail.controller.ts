import { Controller, Get, Param, HttpStatus, Res } from '@nestjs/common';
import { CreateReportDto } from 'src/report/dto/create-report-req.dto';
import { ReportService } from 'src/report/services/report.service';
import {ApiTags} from '@nestjs/swagger'

@Controller('report')
@ApiTags('Report')
export class GetReportController {
  constructor(private readonly reportService: ReportService) {}


  @Get('detail/:id')
  async findOne(
    @Res() response,
    @Param('id') id: string,
  ): Promise<CreateReportDto> {
    try {
      const result = await this.reportService.findOne(id);
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'report retrieve successfully',
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
