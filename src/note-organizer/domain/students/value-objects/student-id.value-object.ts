import { ValueObjectBase } from 'src/common/bases';
import { IErrorValueObject } from 'src/common/interfaces';
import { IsEmpty, IsInteger } from 'src/common/validations';

export class StudentIdValueObject extends ValueObjectBase<number> {
  validateData(): void {
    this.validateIsEmpty();
    this.validateIsInteger();
  }
  validateIsInteger() {
    if (IsInteger(this.value) === false) {
      this.setError({
        field: 'student id',
        message: `${this.value} debe ser un entero`,
      } as IErrorValueObject);
    }
  }
  validateIsEmpty() {
    if (IsEmpty(this.value) === true) {
      this.setError({
        field: 'student id',
        message: 'Es necesario ingresar un ID',
      } as IErrorValueObject);
    }
  }
}
