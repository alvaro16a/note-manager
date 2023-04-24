import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TeacherRepository } from '../repositories';
import { Teacher } from '../database/entities';
import { RegistrarProfesorCommand } from 'src/note-organizer/application/commands';
import { RegistrarProfesorUseCase } from 'src/note-organizer/application/use-cases';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherRepository: TeacherRepository) {}

  @Get()
  async getTeachers(): Promise<Teacher[]> {
    return await this.teacherRepository.findAll();
  }

  @Get(':id')
  async getOneTeacher(@Param('id', ParseIntPipe) id: number): Promise<Teacher> {
    return await this.teacherRepository.findOne(id);
  }

  @Post()
  async create(@Body() command: RegistrarProfesorCommand) {
    const useCase = new RegistrarProfesorUseCase(this.teacherRepository);
    return await useCase.execute(command);
  }
}
