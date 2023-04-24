import { ValueObjectBase } from 'src/common/bases';
import { IErrorValueObject } from 'src/common/interfaces';
import {
  IsEmpty,
  StringMaxLength,
  StringMinLength,
} from 'src/common/validations';

export class NameValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.validateIsEmpty();
    this.ValidateMaxLenght();
    this.ValidateMinLenght();
  }

  private validateIsEmpty(): void {
    if (IsEmpty(this.value) === true) {
      this.setError({
        field: 'name',
        message: 'Es necesario ingresar un nombre',
      } as IErrorValueObject);
    }
  }

  private ValidateMaxLenght(): void {
    const max_Lenght = 20;
    if (this.value && StringMaxLength(this.value, max_Lenght) === true) {
      this.setError({
        field: 'name value object',
        message: `El nombre no puede tener mas de ${max_Lenght} caracteres`,
      } as IErrorValueObject);
    }
  }

  private ValidateMinLenght(): void {
    const min_Lenght = 4;
    if (this.value && StringMinLength(this.value, min_Lenght) === true) {
      this.setError({
        field: 'name value object',
        message: `El nombre no puede tener menos de ${min_Lenght} caracteres`,
      } as IErrorValueObject);
    }
  }
}
