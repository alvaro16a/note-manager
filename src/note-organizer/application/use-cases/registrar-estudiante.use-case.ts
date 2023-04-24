import { ValueObjectErrorHandler } from 'src/common/bases';
import { RegistrarEstudianteCommand } from '../commands';
import { IStudentDomainEntity } from 'src/note-organizer/domain/students/student.interface-entity';
import { StudentRepository } from 'src/note-organizer/infraestructure/repositories/student.repository';
import { StudentIdValueObject } from 'src/note-organizer/domain/students/value-objects';
import { ValueObjectException } from 'src/common/exceptions';
import {
  LastNameValueObject,
  NameValueObject,
} from 'src/note-organizer/domain/common/value-objects';

export class RegistrarEstudianteUseCase extends ValueObjectErrorHandler {
  constructor(private readonly studentRepository: StudentRepository) {
    super();
  }
  async execute(command: RegistrarEstudianteCommand) {
    //Crer objetos de valor
    const id = new StudentIdValueObject(command.id);
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
        'Hay algunos errores en el comando "Registrar Un Estudiante" ${}',
        this.getErrors(),
      );

    // Ejecución de la lógica del caso de uso
    const newStudent: IStudentDomainEntity = {
      id: command.id,
      name: command.name,
      last_name: command.last_name,
      academic_credits: 0,
      average_grade: 0,
    };
    const result = await this.studentRepository.create(newStudent);
    return { data: result };
  }
}
