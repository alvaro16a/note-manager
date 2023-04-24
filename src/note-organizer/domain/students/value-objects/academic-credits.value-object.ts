import { ValueObjectBase } from 'src/common/bases';
import { IErrorValueObject } from 'src/common/interfaces';
import { IsInRange } from 'src/common/validations';

export class AcademiCreditsValueObject extends ValueObjectBase<number> {
  constructor(value?: number) {
    super(value ? value : 0);
  }

  validateData(): void {
    this.validateIsInRange();
  }
  validateIsInRange() {
    const max_credits = 20;
    const min_credits = 0;
    if (IsInRange(this.value, min_credits, max_credits) === false) {
      this.setError({
        field: 'Academic credits',
        message: `no se pueden tener menos de ${min_credits} o mas de ${max_credits} creditos`,
      } as IErrorValueObject);
    }
  }
}
