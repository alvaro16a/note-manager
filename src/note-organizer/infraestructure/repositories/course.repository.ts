import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICourseRepository } from 'src/note-organizer/domain/repositories';
import { Course } from '../database/entities';
import { Repository } from 'typeorm';
import { ICourseDomainEntity } from 'src/note-organizer/domain/courses/course.interface-entity';

@Injectable()
export class CourseRepository implements ICourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException(`Course with #${id} not found`);
    }
    return course;
  }

  async create(course: ICourseDomainEntity): Promise<Course> {
    const newCourse = this.courseRepository.create(course);
    return await this.courseRepository.save(newCourse);
  }
}
