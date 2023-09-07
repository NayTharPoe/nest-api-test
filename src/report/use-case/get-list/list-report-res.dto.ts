import { ReportEntity } from 'src/report/entities/report.entity';

export class ListReportResponseDto {
  taskId: string;
  taskTitle: string;
  project: string;
  percentage: string;
  types: string;
  status: number;
  hour: string;

  constructor(props: ListReportResponseDto) {
    Object.assign(this, props);
  }

  static ReportEntityToDto(entity: ReportEntity): ListReportResponseDto {
    return new ListReportResponseDto({
      taskId: entity.taskId,
      taskTitle: entity.taskTitle,
      project: entity.project,
      percentage: entity.percentage,
      types: entity.percentage,
      status: entity.status,
      hour: entity.hour,
    });
  }
}
