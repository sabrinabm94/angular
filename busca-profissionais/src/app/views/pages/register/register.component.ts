import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import Patterns from 'src/app/utils/patterns';
import TrackByFn from '../../../utils/trackByFn';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public hide: boolean = true;
  public hideConfirmation: boolean = true;
  public errorMessage: string = '';
  public formUser: any = FormGroup;
  public formCompany: any = FormGroup;
  private passwordPattern: string = Patterns.getPasswordPattern();
  private cpfPattern: string = Patterns.getCpfPattern();
  private cnpjPattern: string = Patterns.getCnpjPattern();

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {
    this.formUser = new FormGroup({
      email: new FormControl(this.formUser.email, [
        Validators.required,
        Validators.email,
      ]),
      emailConfirmation: new FormControl(this.formUser.emailConfirmation, [
        Validators.required,
        Validators.pattern(this.passwordPattern),
        Validators.email,
      ]),
      password: new FormControl(this.formUser.password, [
        Validators.required,
        Validators.pattern(this.passwordPattern),
      ]),
      passwordConfirmation: new FormControl(
        this.formUser.passwordConfirmation,
        [Validators.required, Validators.pattern(this.passwordPattern)]
      ),
      cpf: new FormControl(this.formUser.cpf, [
        Validators.required,
        Validators.pattern(this.cpfPattern),
      ]),
      name: new FormControl(this.formUser.name, [Validators.required]),
      lastname: new FormControl(this.formUser.lastname, [Validators.required]),
      state: new FormControl(this.formUser.state, [Validators.required]),
      city: new FormControl(this.formUser.city, [Validators.required]),
      addressStreet: new FormControl(this.formUser.addressStreet, [
        Validators.required,
      ]),
      addressNumber: new FormControl(this.formUser.addressNumber, [
        Validators.required,
      ]),
      addressComplement: new FormControl(this.formUser.addressComplement, [
        Validators.required,
      ]),
      serviceCategory: new FormControl(this.formUser.serviceCategory, [
        Validators.required,
      ]),
      serviceType: new FormControl(this.formUser.serviceType, [
        Validators.required,
      ]),
      descriptionService: new FormControl(this.formUser.descriptionService, [
        Validators.required,
      ]),
    });

    this.formCompany = new FormGroup({
      email: new FormControl(this.formCompany.email, [
        Validators.required,
        Validators.email,
      ]),
      emailConfirmation: new FormControl(this.formCompany.emailConfirmation, [
        Validators.required,
        Validators.pattern(this.passwordPattern),
        Validators.email,
      ]),
      password: new FormControl(this.formCompany.password, [
        Validators.required,
        Validators.pattern(this.passwordPattern),
      ]),
      passwordConfirmation: new FormControl(
        this.formCompany.passwordConfirmation,
        [Validators.required, Validators.pattern(this.passwordPattern)]
      ),
      cnpj: new FormControl(this.formCompany.cnpj, [
        Validators.required,
        Validators.pattern(this.cnpjPattern),
      ]),
      name: new FormControl(this.formCompany.name, [Validators.required]),
      lastname: new FormControl(this.formCompany.lastname, [
        Validators.required,
      ]),
      state: new FormControl(this.formCompany.state, [Validators.required]),
      city: new FormControl(this.formCompany.city, [Validators.required]),
      addressStreet: new FormControl(this.formCompany.addressStreet, [
        Validators.required,
      ]),
      addressNumber: new FormControl(this.formCompany.addressNumber, [
        Validators.required,
      ]),
      addressComplement: new FormControl(this.formCompany.addressComplement, [
        Validators.required,
      ]),
      serviceCategory: new FormControl(this.formCompany.serviceCategory, [
        Validators.required,
      ]),
      serviceType: new FormControl(this.formCompany.serviceType, [
        Validators.required,
      ]),
      descriptionService: new FormControl(this.formCompany.descriptionService, [
        Validators.required,
      ]),
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

  public genericFieldsValidator(form: any) {
    if (form.hasError('required')) {
      this.errorMessage = 'Campo obrigatórios não preenchidos';
    }

    form.controls.password.hasError('pattern')
      ? (this.errorMessage = 'Valor inválido para senha')
      : '';

    form.controls.passwordConfirmation.hasError('pattern') ||
    form.controls.passwordConfirmation !== form.controls.password
      ? (this.errorMessage = 'Valor inválido para confirmação de senha')
      : '';

    form.controls.email.hasError('pattern')
      ? (this.errorMessage = 'Valor inválido para e-mail')
      : '';

    form.controls.emailConfirmation.hasError('pattern') ||
    form.controls.emailConfirmation !== this.formUser.controls.email
      ? (this.errorMessage = 'Valor inválido para confirmação de e-mail')
      : '';

    return this.errorMessage;
  }

  public userFieldsValidator() {
    let form = this.formUser;
    this.errorMessage = this.genericFieldsValidator(form);
    form.controls.cpf.hasError('pattern')
      ? (this.errorMessage = 'Valor inválido para cpf')
      : '';

    return this.errorMessage;
  }

  public companyFieldsValidator() {
    let form = this.formCompany;
    this.errorMessage = this.genericFieldsValidator(form);
    form.controls.cnpj.hasError('pattern')
      ? (this.errorMessage = 'Valor inválido para cpf')
      : '';

    return this.errorMessage;
  }

  public registerUser(event: any) {
    this.userFieldsValidator();
  }

  public registerCompany(event: any) {
    this.companyFieldsValidator();
  }

  trackByFn(item: any, index: any) {
    return TrackByFn.getItemId(item);
  }
}
