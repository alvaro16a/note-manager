import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { StudentRepository } from '../repositories';
import { Student } from '../database/entities';
import { RegistrarEstudianteCommand } from 'src/note-organizer/application/commands';
import { RegistrarEstudianteUseCase } from 'src/note-organizer/application/use-cases';

@Controller('student')
export class StudentController {
  constructor(private readonly studentRepository: StudentRepository) {}

  @Get()
  async getStudents(): Promise<Student[]> {
    return await this.studentRepository.findAll();
  }

  @Get(':id')
  async getOneStudent(@Param('id', ParseIntPipe) id: number): Promise<Student> {
    return await this.studentRepository.findOne(id);
  }

  @Post()
  async create(@Body() command: RegistrarEstudianteCommand) {
    const useCase = new RegistrarEstudianteUseCase(this.studentRepository);
    return await useCase.execute(command);
  }
}
