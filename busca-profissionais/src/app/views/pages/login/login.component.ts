import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import PasswordPattern from '../../../utils/passwordPattern';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private passwordPattern: string = PasswordPattern.getPasswordPattern();
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [
    Validators.required,
    Validators.pattern(this.passwordPattern),
  ]);
  public hide: boolean = true;
  public errorMessage: string = '';
  public form: any = FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      emailField: new FormControl(this.form.emailField, [
        Validators.required,
        Validators.email,
      ]),
      passwordField: new FormControl(this.form.passwordField, [
        Validators.required,
        Validators.pattern(this.passwordPattern),
      ]),
    });
  }

  public getErrorMessage() {
    if (this.form.controls.emailField.hasError('required')) {
      this.errorMessage = 'Campo obrigatório: e-mail';
    }

    if (this.form.controls.passwordField.hasError('required')) {
      this.errorMessage = 'Campo obrigatório: senha';
    }

    this.form.controls.emailField.hasError('email')
      ? (this.errorMessage = 'E-mail inválido: e-mail')
      : '';

    this.form.controls.passwordField.hasError('pattern')
      ? (this.errorMessage = 'Senha inválida: senha')
      : '';

    return this.errorMessage;
  }

  public loginUser(event: any) {
    event.preventDefault();
    this.email = this.form.value.emailField;
    this.password = this.form.value.passwordField;
    this.getErrorMessage();
  }
}
