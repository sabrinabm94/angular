import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import PasswordPattern from '../../../utils/passwordPattern';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent {
  private passwordPattern: string = PasswordPattern.getPasswordPattern();
  public password: string | null = '';
  public passwordConfirmation: string | null = '';
  public hidePassword: boolean = true;
  public hidePasswordConfirmation: boolean = true;
  public errorMessage: string = '';
  public form: any = FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      passwordField: new FormControl(this.form.passwordField, [
        Validators.required,
        Validators.pattern(this.passwordPattern),
      ]),
      passwordFieldConfirmation: new FormControl(
        this.form.passwordFieldConfirmation,
        [Validators.required, Validators.pattern(this.passwordPattern)]
      ),
    });
  }

  public getErrorMessage() {
    if (this.form.controls.passwordField.hasError('required')) {
      this.errorMessage = 'Campo obrigatório: senha';
    }

    if (this.form.controls.passwordFieldConfirmation.hasError('required')) {
      this.errorMessage = 'Campo obrigatório: confirmação da senha';
    }

    this.form.controls.passwordField.hasError('pattern')
      ? (this.errorMessage = 'Senha inválida: senha')
      : '';

    this.form.controls.passwordFieldConfirmation.hasError('pattern')
      ? (this.errorMessage = 'Senha inválida: confirmação da senha')
      : '';

    return this.errorMessage;
  }

  public passwordReset(event: any) {
    event.preventDefault();
    this.password = this.form.value.passwordField;
    this.passwordConfirmation = this.form.value.passwordFieldConfirmation;
    this.getErrorMessage();
  }
}
