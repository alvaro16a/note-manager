import { Injectable, NotFoundException } from '@nestjs/common';
import { IStudentRepository } from 'src/note-organizer/domain/repositories/student.repository.interface';
import { IStudentDomainEntity } from 'src/note-organizer/domain/students/student.interface-entity';
import { Student } from '../database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudentRepository implements IStudentRepository {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) {
      throw new NotFoundException(`Student with #${id} not found`);
    }
    return student;
  }

  async create(student: IStudentDomainEntity): Promise<Student> {
    const newStudent = this.studentRepository.create(student);
    return await this.studentRepository.save(newStudent);
  }

  async update(
    id: number,
    updatedStudent: Partial<IStudentDomainEntity>,
  ): Promise<Student> {
    const student = await this.studentRepository.findOneBy({ id });
    // Actualizar los campos del estudiante con los valores proporcionados en updatedStudent
    Object.assign(student, updatedStudent);
    return await this.studentRepository.save(student);
  }
}
