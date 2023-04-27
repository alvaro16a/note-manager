import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MatricularCursoCommand {
  @IsNotEmpty()
  @ApiProperty()
  readonly id_student: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly id_course: string;
}
