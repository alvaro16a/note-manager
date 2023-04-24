import { Student } from 'src/note-organizer/infraestructure/database/entities/student.entity';
import { IStudentDomainEntity } from '../students/student.interface-entity';

export interface IStudentRepository {
  findAll(): Promise<Student[]>;
  findOne(id: number): Promise<Student>;
  create(student: IStudentDomainEntity): Promise<Student>;
}
