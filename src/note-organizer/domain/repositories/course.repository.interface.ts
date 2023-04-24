import { Course } from 'src/note-organizer/infraestructure/database/entities';
import { ICourseDomainEntity } from '../courses/course.interface-entity';

export interface ICourseRepository {
  findAll(): Promise<Course[]>;
  findOne(id: string): Promise<Course>;
  create(course: ICourseDomainEntity): Promise<Course>;
}
