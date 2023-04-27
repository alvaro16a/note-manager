import { Course } from 'src/note-organizer/infraestructure/database/entities';

export interface IStudentDomainEntity {
  id: number;
  name: string;
  last_name: string;
  average_grade: number;
  academic_credits: number;
  courses: Course[];
}
