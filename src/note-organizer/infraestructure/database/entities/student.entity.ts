import { Column, Entity, ManyToMany, PrimaryColumn, JoinTable } from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class Student {
  @PrimaryColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  last_name: string;

  @Column({ type: 'float' })
  average_grade: number;

  @Column({ type: 'int' })
  academic_credits: number;

  //join table solo va en una de las dos tablas a unir
  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable({
    name: 'course_student',
    joinColumn: {
      name: 'student_id',
    },
    inverseJoinColumn: {
      name: 'course_id',
    },
  })
  courses: Course[];
}
