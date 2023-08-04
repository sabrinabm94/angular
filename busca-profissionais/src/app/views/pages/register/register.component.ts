import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import Patterns from 'src/app/utils/patterns';
import TrackByFn from '../../../utils/trackByFn';
import { ICompany } from '../../../utils/interfaces/ICompany';
import { IProfessional } from '../../../utils/interfaces/IProfessional';
import AddressData from '../../../utils/AddressData';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public hide: boolean = true;
  public hideConfirmation: boolean = true;
  public errorMessage: string = '';
  public formProfessional: any = FormGroup;
  public formCompany: any = FormGroup;
  private passwordPattern: string = Patterns.getPasswordPattern();
  private cpfPattern: string = Patterns.getCpfPattern();
  private cnpjPattern: string = Patterns.getCnpjPattern();

  public options: string[] = ['One', 'Two', 'Three'];
  public countries: string[] = AddressData.countries.map((item) => item.name);
  public states: string[] = AddressData.states.map((item) => item.name);
  public cities: any = AddressData.states.filter(
    (states) => states.name === 'Santa Catarina'
  );
  public citiesOfState: string[] = this.cities[0].cities;

  public filteredOptions: Observable<string[]> | undefined;
  public filteredCountries: Observable<string[]> | undefined;
  public filteredStates: Observable<string[]> | undefined;
  public filteredCities: Observable<string[]> | undefined;
  public filteredCitiesOfState: Observable<string[]> | undefined;

  public myControl = new FormControl('');


  ngOnInit() {
    this.formProfessional = new FormGroup({
      email: new FormControl(this.formProfessional.email, [
        Validators.required,
        Validators.email,
      ]),
      emailConfirmation: new FormControl(
        this.formProfessional.emailConfirmation,
        [
          Validators.required,
          Validators.pattern(this.passwordPattern),
          Validators.email,
        ]
      ),
      password: new FormControl(this.formProfessional.password, [
        Validators.required,
        Validators.pattern(this.passwordPattern),
      ]),
      passwordConfirmation: new FormControl(
        this.formProfessional.passwordConfirmation,
        [Validators.required, Validators.pattern(this.passwordPattern)]
      ),
      cpf: new FormControl(this.formProfessional.cpf, [
        Validators.required,
        Validators.pattern(this.cpfPattern),
      ]),
      name: new FormControl(this.formProfessional.name, [Validators.required]),
      lastname: new FormControl(this.formProfessional.lastname, [
        Validators.required,
      ]),
      state: new FormControl(this.formProfessional.state, [
        Validators.required,
      ]),
      city: new FormControl(this.formProfessional.city, [Validators.required]),
      addressStreet: new FormControl(this.formProfessional.addressStreet, [
        Validators.required,
      ]),
      addressNumber: new FormControl(this.formProfessional.addressNumber, [
        Validators.required,
      ]),
      addressComplement: new FormControl(
        this.formProfessional.addressComplement,
        [Validators.required]
      ),
      addressNeighborhood: new FormControl(
        this.formProfessional.addressNeighborhood,
        [Validators.required]
      ),
      addressState: new FormControl(this.formProfessional.addressState, [
        Validators.required,
      ]),
      addressCountry: new FormControl(this.formProfessional.addressCountry, [
        Validators.required,
      ]),
      serviceCategory: new FormControl(this.formProfessional.serviceCategory, [
        Validators.required,
      ]),
      serviceType: new FormControl(this.formProfessional.serviceType, [
        Validators.required,
      ]),
      serviceDescription: new FormControl(
        this.formProfessional.serviceDescription,
        [Validators.required]
      ),
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
      addressNeighborhood: new FormControl(
        this.formCompany.addressNeighborhood,
        [Validators.required]
      ),
      addressState: new FormControl(this.formCompany.addressState, [
        Validators.required,
      ]),
      addressCountry: new FormControl(this.formCompany.addressCountry, [
        Validators.required,
      ]),
      serviceCategory: new FormControl(this.formCompany.serviceCategory, [
        Validators.required,
      ]),
      serviceType: new FormControl(this.formCompany.serviceType, [
        Validators.required,
      ]),
      serviceDescription: new FormControl(this.formCompany.serviceDescription, [
        Validators.required,
      ]),
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.filteredCountries = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCountries(value || ''))
    );

    this.filteredStates = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterStates(value || ''))
    );

    this.filteredCities = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCities(value || ''))
    );

    this.filteredCitiesOfState = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCitiesOfState(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter((contry) =>
      contry.toLowerCase().includes(filterValue)
    );
  }

  private filterStates(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.states.filter((state: string) =>
      state.toLowerCase().includes(filterValue)
    );
  }

  private filterCities(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter((city: string) =>
      city.toLowerCase().includes(filterValue)
    );
  }

  private filterCitiesOfState(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.citiesOfState.filter((city: string) =>
      city.toLowerCase().includes(filterValue)
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
    form.controls.emailConfirmation !== this.formProfessional.controls.email
      ? (this.errorMessage = 'Valor inválido para confirmação de e-mail')
      : '';

    return this.errorMessage;
  }

  public professionalFieldsValidator() {
    let form = this.formProfessional;
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

  private generateSlug(object: IProfessional | ICompany) {
    object.slug = object.name + object.lastname;
    object.link = '/' + object.slug;

    return object;
  }

  private generateLink(object: IProfessional | ICompany) {
    object.link = '/' + object.slug;

    console.log(object);
    return object;
  }

  public registerUser(form: any) {
    this.professionalFieldsValidator();

    let professional: IProfessional = {
      cpf: form.controls.cpf.value,
      serviceDescription: form.controls.serviceDescription.value,
      email: form.controls.email.value,
      emailConfirmation: form.controls.emailConfirmation.value,
      lastname: form.controls.lastname.value,
      name: form.controls.name.value,
      password: form.controls.password.value,
      passwordConfirmation: form.controls.passwordConfirmation.value,
      serviceType: form.controls.serviceType.value,
      link: '',
      slug: '',
      localization: {
        state: form.controls.addressState.value,
        city: form.controls.addressCity.value,
        neighborhood: form.controls.addressNeighborhood.value,
        street: form.controls.addressStreet,
        number: form.controls.addressNumber,
        complement: form.controls.addressComplement.value,
        cep: form.controls.addressCep,
      },
      serviceArea: {
        state: form.controls.serviceAddressState.value,
        city: form.controls.serviceAddressCity.value,
        neighborhood: form.controls.serviceAddressNeighborhood.value,
        street: form.controls.serviceAddressStreet,
        number: form.controls.serviceAddressNumber,
        complement: form.controls.serviceAddressComplement.value,
        cep: form.controls.serviceAddressCep,
      },
      images: [],
      socialNetworks: [],
      categories: [form.controls.serviceCategory.value],
    };

    this.generateSlug(professional);
    this.generateLink(professional);
  }

  public registerCompany(form: any) {
    this.companyFieldsValidator();

    let company: ICompany = {
      cnpj: form.controls.cnpj.value,
      serviceDescription: form.controls.serviceDescription.value,
      email: form.controls.email.value,
      emailConfirmation: form.controls.emailConfirmation.value,
      lastname: form.controls.lastname.value,
      name: form.controls.name.value,
      password: form.controls.password.value,
      passwordConfirmation: form.controls.passwordConfirmation.value,
      serviceType: form.controls.serviceType.value,
      link: '',
      slug: '',
      localization: {
        state: form.controls.addressState.value,
        city: form.controls.addressCity.value,
        neighborhood: form.controls.addressNeighborhood.value,
        street: form.controls.addressStreet,
        number: form.controls.addressNumber,
        complement: form.controls.addressComplement.value,
        cep: form.controls.addressCep,
      },
      serviceArea: {
        state: form.controls.serviceAddressState.value,
        city: form.controls.serviceAddressCity.value,
        neighborhood: form.controls.serviceAddressNeighborhood.value,
        street: form.controls.serviceAddressStreet,
        number: form.controls.serviceAddressNumber,
        complement: form.controls.serviceAddressComplement.value,
        cep: form.controls.serviceAddressCep,
      },
      images: [],
      socialNetworks: [],
      categories: [form.controls.serviceCategory.value],
    };

    this.generateSlug(company);
    this.generateLink(company);
  }

  trackByFn(item: any, index: any) {
    return TrackByFn.getItemId(item);
  }
}
