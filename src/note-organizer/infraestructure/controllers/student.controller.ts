import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { CourseRepository, StudentRepository } from '../repositories';
import { Student } from '../database/entities';
import {
  MatricularCursoCommand,
  RegistrarEstudianteCommand,
} from 'src/note-organizer/application/commands';
import {
  MatricularCursoUseCase,
  RegistrarEstudianteUseCase,
} from 'src/note-organizer/application/use-cases';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly courseRepository: CourseRepository,
  ) {}

  @Get()
  async getStudents(): Promise<Student[]> {
    return await this.studentRepository.findAll();
  }

  @Get(':id')
  async getOneStudent(@Param('id', ParseIntPipe) id: number): Promise<Student> {
    return await this.studentRepository.findOne(id)[0];
  }

  @Post()
  async create(@Body() command: RegistrarEstudianteCommand) {
    const useCase = new RegistrarEstudianteUseCase(this.studentRepository);
    return await useCase.execute(command);
  }

  @Post('matricular')
  async enrollInCourse(@Body() command: MatricularCursoCommand) {
    const useCase = new MatricularCursoUseCase(
      this.studentRepository,
      this.courseRepository,
    );
    return await useCase.execute(command);
  }
}
