import { ValueObjectBase } from 'src/common/bases';
import { IErrorValueObject } from 'src/common/interfaces';
import { IsUUID4 } from 'src/common/validations';
import { v4 as uuid } from 'uuid';

export class CourseIdValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : uuid());
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && IsUUID4(this.value) === false) {
      this.setError({
        field: 'Course',
        message: 'El "Id" no tiene un formato válido',
      } as IErrorValueObject);
    }
  }
}
