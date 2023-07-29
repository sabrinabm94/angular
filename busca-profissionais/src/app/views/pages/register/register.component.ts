import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import PasswordPattern from 'src/app/utils/passwordPattern';
import TrackByFn from '../../../utils/trackByFn';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public hide: boolean = true;
  public errorMessage: string = '';
  public formUser: any = FormGroup;
  public formCompany: any = FormGroup;
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
    this.formUser = new FormGroup({
      emailField: new FormControl(this.formUser.emailField, [
        Validators.required,
        Validators.email,
      ]),
      passwordField: new FormControl(this.formUser.passwordField, [
        Validators.required,
        Validators.pattern(this.passwordPattern),
      ]),
    });

    this.formCompany = new FormGroup({
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  public getformUserErrorMessage() {
    if (this.formUser.controls.emailField.hasError('required')) {
      this.errorMessage = 'Campo obrigatório: e-mail';
    }

    if (this.formUser.controls.passwordField.hasError('required')) {
      this.errorMessage = 'Campo obrigatório: senha';
    }

    this.formUser.controls.emailField.hasError('email')
      ? (this.errorMessage = 'E-mail inválido: e-mail')
      : '';

    this.formUser.controls.passwordField.hasError('pattern')
      ? (this.errorMessage = 'Senha inválida: senha')
      : '';

    return this.errorMessage;
  }

  public getformCompanyErrorMessage() {
    return this.errorMessage;
  }


  public registerUser(event: any) {
    event.preventDefault();
    this.email = this.formUser.value.emailField;
    this.password = this.formUser.value.passwordField;
    this.getformUserErrorMessage();
  }

  public registerCompany(event: any) {
    this.getformCompanyErrorMessage();
  }

  trackByFn(item: any, index: any) {
    return TrackByFn.getItemId(item);
  }
}
