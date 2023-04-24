import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class Course {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'int' })
  credits: number;

  @ManyToMany(() => Student, (student) => student.courses)
  students: Student[];
}
