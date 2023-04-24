import { ValueObjectBase } from 'src/common/bases';
import { IErrorValueObject } from 'src/common/interfaces';
import { IsEmpty, IsInRange } from 'src/common/validations';

export class CreditsValueObject extends ValueObjectBase<number> {
  validateData(): void {
    this.validateIsEmpty();
    this.validateIsInRange();
  }
  validateIsInRange() {
    const max_credits = 10;
    const min_credits = 1;
    if (IsInRange(this.value, min_credits, max_credits) === false) {
      this.setError({
        field: 'Course',
        message: `Un curso no puede tener menos de ${min_credits} o mas de ${max_credits} creditos`,
      } as IErrorValueObject);
    }
  }
  validateIsEmpty() {
    if (IsEmpty(this.value) === true) {
      this.setError({
        field: 'Course',
        message: 'Es necesario ingresar un numero de creditos',
      } as IErrorValueObject);
    }
  }
}
