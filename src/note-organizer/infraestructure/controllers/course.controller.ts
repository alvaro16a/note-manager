import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CourseRepository } from '../repositories';
import { Course } from '../database/entities';
import { RegistrarCourseCommand } from 'src/note-organizer/application/commands';
import { RegistrarCursoUseCase } from 'src/note-organizer/application/use-cases';

@Controller('course')
export class CourseController {
  constructor(private readonly courseRepository: CourseRepository) {}

  @Get()
  async getCourses(): Promise<Course[]> {
    return await this.courseRepository.findAll();
  }

  @Get(':id')
  async getOneCourse(@Param('id') id: string): Promise<Course> {
    return await this.courseRepository.findOne(id);
  }

  @Post()
  async create(@Body() command: RegistrarCourseCommand) {
    const useCase = new RegistrarCursoUseCase(this.courseRepository);
    return await useCase.execute(command);
  }
}
