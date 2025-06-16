import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function birthDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    // Verifica se está vazio
    if (!value) {
      return { required: true };
    }

    // Valida o formato usando regex
    const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!DATE_REGEX.test(value)) {
      return { invalidFormat: true };
    }

    // Valida se a data é uma data real (ex.: 30/02/2000 seria inválida)
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return { invalidDate: true };
    }

    // Valida se o usuário tem pelo menos 18 anos
    const today = new Date();
    const age =
      today.getFullYear() -
      year -
      (today.getMonth() < month - 1 ||
      (today.getMonth() === month - 1 && today.getDate() < day)
        ? 1
        : 0);

    if (age < 18) {
      return { underage: true };
    }

    return null; // Validação passou
  };
}
