import { ValueObjectBase } from 'src/common/bases';
import { IErrorValueObject } from 'src/common/interfaces';
import {
  IsEmpty,
  StringMaxLength,
  StringMinLength,
} from 'src/common/validations';

export class LastNameValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.validateIsEmpty();
    this.ValidateMaxLenght();
    this.ValidateMinLenght();
  }

  private validateIsEmpty(): void {
    if (IsEmpty(this.value) === true) {
      this.setError({
        field: 'last name',
        message: 'Es necesario ingresar un apellido',
      } as IErrorValueObject);
    }
  }

  private ValidateMaxLenght(): void {
    const max_Lenght = 40;
    if (this.value && StringMaxLength(this.value, max_Lenght) === true) {
      this.setError({
        field: 'name value object',
        message: `El apellido no puede tener mas de ${max_Lenght} caracteres`,
      } as IErrorValueObject);
    }
  }

  private ValidateMinLenght(): void {
    const min_Lenght = 2;
    if (this.value && StringMinLength(this.value, min_Lenght) === true) {
      this.setError({
        field: 'name value object',
        message: `El apellido no puede tener menos de ${min_Lenght} caracteres`,
      } as IErrorValueObject);
    }
  }
}
