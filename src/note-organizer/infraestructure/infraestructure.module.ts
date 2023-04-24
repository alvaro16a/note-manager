import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepository } from './repositories/student.repository';
import { Course, Student, Teacher } from './database/entities';
import { TeacherRepository } from './repositories/teacher.repository';
import { CourseRepository } from './repositories';
import { StudentController } from './controllers/student.controller';
import { CourseController } from './controllers/course.controller';
import { TeacherController } from './controllers/teacher.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Teacher, Course])],
  providers: [StudentRepository, TeacherRepository, CourseRepository],
  exports: [StudentRepository, TeacherRepository, CourseRepository],
  controllers: [StudentController, CourseController, TeacherController],
})
export class InfraestructureModule {}
