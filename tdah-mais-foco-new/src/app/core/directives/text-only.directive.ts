import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { TextOnlyValidator } from '../validators/text-only.validator';

@Directive({
  selector: '[appTextOnly]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: TextOnlyDirective,
      multi: true,
    },
  ],
})
export class TextOnlyDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return TextOnlyValidator.validate(control);
  }
}
