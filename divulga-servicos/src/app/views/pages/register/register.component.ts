import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import PasswordPattern from 'src/app/utils/passwordPattern';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public hide: boolean = true;
  public errorMessage: string = '';
  public form: any = FormGroup;

  private passwordPattern: string = PasswordPattern.getPasswordPattern();
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [
    Validators.required,
    Validators.pattern(this.passwordPattern),
  ]);

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {

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

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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

  public registerUser(event: any) {
    event.preventDefault();
    this.email = this.form.value.emailField;
    this.password = this.form.value.passwordField;
    this.getErrorMessage();
  }
}
