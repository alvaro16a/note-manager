import { Teacher } from 'src/note-organizer/infraestructure/database/entities';
import { ITeacherDomainEntity } from '../teachers/teacher.interface-entity';

export interface ITeacherRepository {
  findAll(): Promise<Teacher[]>;
  findOne(id: number): Promise<Teacher>;
  create(teacher: ITeacherDomainEntity): Promise<Teacher>;
}
