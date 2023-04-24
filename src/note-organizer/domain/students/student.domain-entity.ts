import { IStudentDomainEntity } from './student.interface-entity';

export class StudentDomainEntity implements IStudentDomainEntity {
  id: number;
  name: string;
  last_name: string;
  average_grade: number;
  academic_credits: number;

  constructor(student?: IStudentDomainEntity) {
    if (student.id) this.id = student.id;
    if (student.name) this.name = student.name;
    if (student.last_name) this.last_name = student.last_name;
    if (student.average_grade) this.average_grade = student.average_grade;
    if (student.academic_credits)
      this.academic_credits = student.academic_credits;
  }
}
