import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITeacherRepository } from 'src/note-organizer/domain/repositories/teacher.repository.interface';
import { Teacher } from '../database/entities';
import { ITeacherDomainEntity } from 'src/note-organizer/domain/teachers/teacher.interface-entity';

@Injectable()
export class TeacherRepository implements ITeacherRepository {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async findAll(): Promise<Teacher[]> {
    return await this.teacherRepository.find();
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOneBy({ id });
    if (!teacher) {
      throw new NotFoundException(`Student with #${id} not found`);
    }
    return teacher;
  }

  async create(teacher: ITeacherDomainEntity): Promise<Teacher> {
    const newTEacher = this.teacherRepository.create(teacher);
    return await this.teacherRepository.save(newTEacher);
  }
}
