import { AbstractControl, ValidationErrors } from '@angular/forms';

export class TextOnlyValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!value || value.trim() === '') {
      return { required: true };
    }

    if (!regex.test(value)) {
      return { textOnly: true };
    }

    return null;
  }
}
