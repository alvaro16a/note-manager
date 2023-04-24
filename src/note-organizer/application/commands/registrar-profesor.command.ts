import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegistrarProfesorCommand {
  @IsNotEmpty()
  @ApiProperty()
  readonly id: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly last_name: string;
}
