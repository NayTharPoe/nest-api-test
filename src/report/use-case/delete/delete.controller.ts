import { Controller, Delete, Param, HttpStatus, Res } from '@nestjs/common';
import { CreateReportDto } from 'src/report/dto/create-report-req.dto';
import { ReportService } from 'src/report/services/report.service';
import {ApiTags} from '@nestjs/swagger'

@Controller('report')
@ApiTags('Report')
export class DeleteReportController {
  constructor(private readonly reportService: ReportService) {}

  @Delete('delete/:id')
  async delete(
    @Res() response,
    @Param('id') id: string,
  ): Promise<CreateReportDto> {
    try {
      const result = await this.reportService.remove(id);
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'report delete successfully',
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
