import { ValueObjectErrorHandler } from 'src/common/bases';
import { ValueObjectException } from 'src/common/exceptions';
import { TeacherRepository } from 'src/note-organizer/infraestructure/repositories/teacher.repository';
import { RegistrarProfesorCommand } from '../commands/registrar-profesor.command';
import {
  LastNameValueObject,
  NameValueObject,
} from 'src/note-organizer/domain/common/value-objects';
import { TeacherIdValueObject } from 'src/note-organizer/domain/teachers/value-objects/teacher-id.value-object';
import { ITeacherDomainEntity } from 'src/note-organizer/domain/teachers/teacher.interface-entity';

export class RegistrarProfesorUseCase extends ValueObjectErrorHandler {
  constructor(private readonly teacherRepository: TeacherRepository) {
    super();
  }
  async execute(command: RegistrarProfesorCommand) {
    //Crer objetos de valor
    const id = new TeacherIdValueObject(command.id);
    const name = new NameValueObject(command.name);
    const last_name = new LastNameValueObject(command.last_name);

    //Recopilacion de errores
    if (id.hasErrors() === true) this.setErrors(id.getErrors());
    if (name.hasErrors() === true) this.setErrors(name.getErrors());
    if (last_name.hasErrors() === true) this.setErrors(last_name.getErrors());
    console.log(this.getErrors());
    //Validacion de errores
    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando "Registrar Un Profesor" ${}',
        this.getErrors(),
      );

    // Ejecución de la lógica del caso de uso
    const newTeacher: ITeacherDomainEntity = {
      id: command.id,
      name: command.name,
      last_name: command.last_name,
    };
    const result = await this.teacherRepository.create(newTeacher);
    return { data: result };
  }
}
