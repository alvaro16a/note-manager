import { Student } from 'src/note-organizer/infraestructure/database/entities';

export interface ICourseDomainEntity {
  id: string;
  name: string;
  credits: number;
  students: Student[];
}
