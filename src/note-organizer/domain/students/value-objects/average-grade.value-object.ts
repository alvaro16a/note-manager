import { ValueObjectBase } from 'src/common/bases';
import { IErrorValueObject } from 'src/common/interfaces';
import { IsEmpty, IsInRange } from 'src/common/validations';

export class AverageGradeValueObject extends ValueObjectBase<number> {
  max_grade = 5;
  validateData(): void {
    this.validateIsEmpty();
    this.validateIsGrade();
  }
  validateIsEmpty() {
    if (IsEmpty(this.value) === true) {
      this.setError({
        field: 'average grade',
        message: 'Es necesario ingresar un promedio',
      } as IErrorValueObject);
    }
  }
  validateIsGrade() {
    if (IsInRange(this.value, 0, this.max_grade) === false) {
      this.setError({
        field: 'average grade',
        message: `${this.value} no esta en el rango de una calificacion valida`,
      } as IErrorValueObject);
    }
  }
}
