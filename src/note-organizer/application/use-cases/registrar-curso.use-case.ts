import { ValueObjectErrorHandler } from 'src/common/bases';
import { CourseRepository } from 'src/note-organizer/infraestructure/repositories';
import { RegistrarCourseCommand } from '../commands/registrar-curso.command';
import { NameValueObject } from 'src/note-organizer/domain/common/value-objects';
import { CourseIdValueObject } from 'src/note-organizer/domain/courses/value-objects/course-id.value-object';
import { CreditsValueObject } from 'src/note-organizer/domain/courses/value-objects/credits.value-object';
import { ValueObjectException } from 'src/common/exceptions';
import { ICourseDomainEntity } from 'src/note-organizer/domain/courses/course.interface-entity';

export class RegistrarCursoUseCase extends ValueObjectErrorHandler {
  constructor(private readonly courseRepository: CourseRepository) {
    super();
  }
  async execute(command: RegistrarCourseCommand) {
    //Crer objetos de valor
    const id = new CourseIdValueObject(command.id);
    const name = new NameValueObject(command.name);
    const credits = new CreditsValueObject(command.credits);

    //Recopilacion de errores
    if (id.hasErrors() === true) this.setErrors(id.getErrors());
    if (name.hasErrors() === true) this.setErrors(name.getErrors());
    if (credits.hasErrors() === true) this.setErrors(credits.getErrors());
    console.log(this.getErrors());

    //Validacion de errores
    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando "Crear un curso" ${}',
        this.getErrors(),
      );

    // Ejecución de la lógica del caso de uso
    const newCourse: ICourseDomainEntity = {
      id: id.valueOf(),
      name: name.valueOf(),
      credits: credits.valueOf(),
      students: [],
    };
    const result = await this.courseRepository.create(newCourse);
    return { data: result };
  }
}
