import { ValueObjectErrorHandler } from 'src/common/bases';
import {
  CourseRepository,
  StudentRepository,
} from 'src/note-organizer/infraestructure/repositories';
import { MatricularCursoCommand } from '../commands';
import { CourseIdValueObject } from 'src/note-organizer/domain/courses/value-objects/course-id.value-object';
import { StudentIdValueObject } from 'src/note-organizer/domain/students/value-objects';
import { ValueObjectException } from 'src/common/exceptions';
import {
  Course,
  Student,
} from 'src/note-organizer/infraestructure/database/entities';
import { IErrorValueObject } from 'src/common/interfaces';

export class MatricularCursoUseCase extends ValueObjectErrorHandler {
  private maxCreditos = 20;
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly courseRepository: CourseRepository,
  ) {
    super();
  }

  async execute(command: MatricularCursoCommand) {
    //Crer objetos de valor
    const id_student = new StudentIdValueObject(command.id_student);
    const id_course = new CourseIdValueObject(command.id_course);

    //Recopilacion de errores de formato
    if (id_student.hasErrors() === true) this.setErrors(id_student.getErrors());
    if (id_course.hasErrors() === true) this.setErrors(id_course.getErrors());

    //Encontrando estudiantes y cursos de la base de datos
    const nStudent: Student = await this.studentRepository.findOne(
      id_student.valueOf(),
    );

    const nCourse: Course = await this.courseRepository.findOne(
      id_course.valueOf(),
    );

    //Validar las diferentes condiciones
    //validar si el estudiante existe
    if (!nStudent) {
      const error: IErrorValueObject = {
        field: 'matricular curso',
        message: 'El estudiante al que desea asignarle el curso no exite',
      };
      this.setErrors([error]);
    }
    //validar si el curso existe
    if (!nCourse) {
      const error: IErrorValueObject = {
        field: 'matricular curso',
        message: 'El curso no exite',
      };
      this.setErrors([error]);
    }
    //Validar si el numero de creditos imposibilita la matriculas
    if (nStudent.academic_credits + nCourse.credits > this.maxCreditos) {
      const error: IErrorValueObject = {
        field: 'matricular curso',
        message:
          'No se puede matricular el curso porque superaria el limite maximo de creditos',
      };
      this.setErrors([error]);
    }
    //Validar si el estudiante ya matriculo el curso
    if (Array.isArray(nStudent.courses)) {
      if (nStudent.courses.includes(nCourse)) {
        const error: IErrorValueObject = {
          field: 'matricular curso',
          message: 'El estudiante ya habia matriculado el curso',
        };
        this.setErrors([error]);
      }
    }
    //Validacion de errores
    if (this.hasErrors() === true) {
      console.log(this.getErrors());
      throw new ValueObjectException(
        'Hay algunos errores en el comando "MatricularCurso" ${}',
        this.getErrors(),
      );
    }
    // Ejecución de la lógica del caso de uso
    if (Array.isArray(nStudent.courses)) {
      nStudent.courses.push(nCourse);
    } else {
      nStudent.courses = [nCourse];
    }

    return await this.studentRepository.update(nStudent.id, nStudent);
  }
}
