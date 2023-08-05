import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import Patterns from 'src/app/utils/patterns';
import Generators from 'src/app/utils/generators';
import TrackByFn from '../../../utils/trackByFn';
import AddressData from '../../../utils/AddressData';
import { IProfessional } from 'src/app/utils/interfaces/IProfessional';
import { ICompany } from 'src/app/utils/interfaces/ICompany';
import { IUser } from 'src/app/utils/interfaces/IUser.interface';
import { ICategory } from 'src/app/utils/interfaces/ICategory.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @ViewChild('professionalServiceCategory')
  professionalServiceCategory!: ElementRef;

  @ViewChild('professionalAddressCountry')
  professionalAddressCountry!: ElementRef;

  @ViewChild('professionalAddressState')
  professionalAddressState!: ElementRef;

  @ViewChild('professionalAddressCity')
  professionalAddressCity!: ElementRef;

  @ViewChild('professionalServiceAddressCountry')
  professionalServiceAddressCountry!: ElementRef;

  @ViewChild('professionalServiceAddressState')
  professionalServiceAddressState!: ElementRef;

  @ViewChild('professionalServiceAddressCity')
  professionalServiceAddressCity!: ElementRef;

  @ViewChild('companyServiceCategory')
  companyServiceCategory!: ElementRef;

  @ViewChild('companyAddressCountry')
  companyAddressCountry!: ElementRef;

  @ViewChild('companyAddressState')
  companyAddressState!: ElementRef;

  @ViewChild('companyAddressCity')
  companyAddressCity!: ElementRef;

  @ViewChild('companyServiceAddressCountry')
  companyServiceAddressCountry!: ElementRef;

  @ViewChild('companyServiceAddressState')
  companyServiceAddressState!: ElementRef;

  @ViewChild('companyServiceAddressCity')
  companyServiceAddressCity!: ElementRef;

  public hide: boolean = true;
  public hideConfirmation: boolean = true;
  public errorMessage: string = '';
  public formProfessional!: FormGroup;
  public formCompany!: FormGroup;
  private passwordPattern: string = Patterns.getPasswordPattern();
  private cpfPattern: string = Patterns.getCpfPattern();
  private cnpjPattern: string = Patterns.getCnpjPattern();
  private cepPattern: string = Patterns.getCepPattern();

  public categories: Array<ICategory> = [
    {
      id: '1',
      name: 'Assistência técnica',
      description:
        'Conheça profissionais de' +
        name +
        'para atender para encontrar e solucionar problemas.',
      link: '/assistencia-tecnica',
      slug: 'assistencia-tecnica',
      images: [
        {
          link: '../../../assets/images/category/montagem-moveis.png',
          title: 'Assistência técnica',
        },
      ],
    },
  ];
  public countries: string[] = AddressData.countries.map((item) => item.name);
  public states: string[] = AddressData.states.map((item) => item.name);
  public cities: any = AddressData.states.filter(
    (states) => states.name === 'Santa Catarina'
  );
  public citiesOfState: string[] = this.cities[0].cities;

  public filteredCategories: Observable<ICategory[]> | undefined;
  public filteredCountries: Observable<string[]> | undefined;
  public filteredStates: Observable<string[]> | undefined;
  public filteredCities: Observable<string[]> | undefined;
  public filteredCitiesOfState: Observable<string[]> | undefined;

  public myControl = new FormControl('');

  constructor(private formBuilder: FormBuilder) {
    this.formCompany = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      emailConfirmation: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordPattern),
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordPattern),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordPattern),
      ]),
      cnpj: new FormControl('', [
        Validators.required,
        Validators.pattern(this.cnpjPattern),
      ]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      addressComplement: new FormControl(''),
      addressCountry: new FormControl('', [Validators.required]),
      addressState: new FormControl('', [Validators.required]),
      addressCity: new FormControl('', [Validators.required]),
      addressNeighborhood: new FormControl('', [Validators.required]),
      addressStreet: new FormControl('', [Validators.required]),
      addressNumber: new FormControl('', [Validators.required]),
      addressCep: new FormControl('', [
        Validators.required,
        Validators.pattern(this.cepPattern),
      ]),
      serviceAddressCountry: new FormControl('', [Validators.required]),
      serviceAddressState: new FormControl('', [Validators.required]),
      serviceAddressCity: new FormControl('', [Validators.required]),
      serviceAddressCep: new FormControl('', [
        Validators.required,
        Validators.pattern(this.cepPattern),
      ]),
      serviceCategory: new FormControl('', [Validators.required]),
      serviceType: new FormControl(''),
      serviceDescription: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });

    this.formProfessional = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      emailConfirmation: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordPattern),
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordPattern),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordPattern),
      ]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(this.cpfPattern),
      ]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      addressStreet: new FormControl('', [Validators.required]),
      addressNumber: new FormControl('', [Validators.required]),
      addressComplement: new FormControl(''),
      addressNeighborhood: new FormControl('', [Validators.required]),
      addressCity: new FormControl('', [Validators.required]),
      addressState: new FormControl('', [Validators.required]),
      addressCountry: new FormControl('', [Validators.required]),
      addressCep: new FormControl('', [
        Validators.required,
        Validators.pattern(this.cepPattern),
      ]),
      serviceAddressCountry: new FormControl('', [Validators.required]),
      serviceAddressState: new FormControl('', [Validators.required]),
      serviceAddressCity: new FormControl('', [Validators.required]),
      serviceAddressCep: new FormControl('', [
        Validators.required,
        Validators.pattern(this.cepPattern),
      ]),
      serviceCategory: new FormControl('', [Validators.required]),
      serviceType: new FormControl('', [Validators.required]),
      serviceDescription: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });

    this.filteredCategories = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCategories(value || ''))
    );

    this.filteredCountries = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCountries(value || ''))
    );

    this.filteredStates = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterStates(value || ''))
    );

    this.filteredCitiesOfState = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCitiesOfState(value || ''))
    );
  }

  private filterCategories(value: string): ICategory[] {
    const filterValue = value.toLowerCase();

    let filterResultValue = this.categories.filter((category) =>
      category.name.toLowerCase().includes(filterValue)
    );

    return filterResultValue;
  }

  private filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();

    let filterResultValue = this.countries.filter((country: string) =>
      country.toLowerCase().includes(filterValue)
    );

    return filterResultValue;
  }

  private filterStates(value: string): string[] {
    const filterValue = value.toLowerCase();

    let filterResultValue = this.states.filter((state: string) =>
      state.toLowerCase().includes(filterValue)
    );

    return filterResultValue;
  }

  private filterCitiesOfState(value: string): string[] {
    const filterValue = value.toLowerCase();

    let filterResultValue = this.citiesOfState.filter((city: string) =>
      city.toLowerCase().includes(filterValue)
    );

    return filterResultValue;
  }

  public genericFieldsValidator(form: any) {
    console.log('genericFieldsValidator');
    console.log(form);

    this.errorMessage = '';

    if (form.pristine === false) {
      //valida erros somente para formulário preenchido

      if (form.valid === false) {
        if (form.hasError('Required')) {
          //validação de erros para campos vazios
          this.errorMessage = 'Campo obrigatórios não preenchidos';
        } else {
          //validação de erros para campos preenchidos incorretamente
          form.controls.password.hasError('pattern')
            ? (this.errorMessage = 'Valor inválido para senha')
            : '';

          form.controls.passwordConfirmation.hasError('pattern') ||
          form.controls.passwordConfirmation.value !==
            form.controls.password.value
            ? (this.errorMessage = 'Valor inválido para confirmação de senha')
            : '';

          form.controls.email.errors &&
          form.controls.email.errors.email === true
            ? (this.errorMessage = 'Valor inválido para e-mail')
            : '';

          (form.controls.emailConfirmation.errors &&
            form.controls.emailConfirmation.errors.email === true) ||
          form.controls.emailConfirmation.value !== form.controls.email.value
            ? (this.errorMessage = 'Valor inválido para confirmação de e-mail')
            : '';
        }
      }
    }

    return this.errorMessage;
  }

  public professionalFieldsValidator(form: any) {
    this.errorMessage = this.genericFieldsValidator(form);

    form.controls['cpf'].hasError('pattern')
      ? (this.errorMessage = 'Valor inválido para cpf')
      : '';

    // if (this.errorMessage === '') {
    //   form.status = 'VALID';
    // }

    return this.errorMessage;
  }

  public companyFieldsValidator(form: any) {
    this.errorMessage = this.genericFieldsValidator(form);

    form.controls['cnpj'].hasError('pattern')
      ? (this.errorMessage = 'Valor inválido para cnpj')
      : '';

    if (this.errorMessage === '') {
      form.status = 'VALID';
    }

    return this.errorMessage;
  }

  public registerProfessional(form: any): IUser | null {
    if (this.professionalAddressCountry.nativeElement.value) {
      form.controls.addressCountry.value =
        this.professionalAddressCountry.nativeElement.value;
      form.controls.addressCountry.status = 'VALID';
      form.controls.addressCountry.errors = {};
      form.value.addressCountry = form.controls.addressCountry.value;
    }

    if (this.professionalAddressState.nativeElement.value) {
      form.controls.addressState.value =
        this.professionalAddressState.nativeElement.value;
      form.controls.addressState.status = 'VALID';
      form.controls.addressState.errors = {};
      form.value.addressState = form.controls.addressState.value;
    }

    if (this.professionalAddressCity.nativeElement.value) {
      form.controls.addressCity.value =
        this.professionalAddressCity.nativeElement.value;
      form.controls.addressCity.status = 'VALID';
      form.controls.addressCity.errors = {};
      form.value.addressCity = form.controls.addressCity.value;
    }

    if (this.professionalServiceAddressCountry.nativeElement.value) {
      form.controls.serviceAddressCountry.value =
        this.professionalServiceAddressCountry.nativeElement.value;
      form.controls.serviceAddressCountry.status = 'VALID';
      form.controls.serviceAddressCountry.errors = {};
      form.value.serviceAddressCountry =
        form.controls.serviceAddressCountry.value;
    }

    if (this.professionalServiceAddressState.nativeElement.value) {
      form.controls.serviceAddressState.value =
        this.professionalServiceAddressState.nativeElement.value;
      form.controls.serviceAddressState.status = 'VALID';
      form.controls.serviceAddressState.errors = {};
      form.value.serviceAddressState = form.controls.serviceAddressState.value;
    }

    if (this.professionalServiceAddressCity.nativeElement.value) {
      form.controls.serviceAddressCity.value =
        this.professionalServiceAddressCity.nativeElement.value;
      form.controls.serviceAddressCity.status = 'VALID';
      form.controls.serviceAddressCity.errors = {};
      form.value.serviceAddressCity = form.controls.serviceAddressCity.value;
    }

    if (this.professionalServiceCategory.nativeElement.value) {
      form.controls.serviceCategory.value =
        this.professionalServiceCategory.nativeElement.value;
      form.controls.serviceCategory.status = 'VALID';
      form.controls.serviceCategory.errors = {};
      form.value.serviceCategory = form.controls.serviceCategory.value;
    }

    this.professionalFieldsValidator(form);

    if (form.valid === true) { //TODO: não validando corretamente o formulário inválido
      let professional: IProfessional = {
        cpf: form.controls.cpf.value,
        serviceDescription: form.controls.serviceDescription.value,
        email: form.controls.email.value,
        emailConfirmation: form.controls.emailConfirmation.value,
        lastname: form.controls.lastname.value,
        name: form.controls.name.value,
        password: form.controls.password.value,
        passwordConfirmation: form.controls.passwordConfirmation.value,
        serviceType: form.controls.serviceType.value, //TODO: pegar valor de enum do formulário
        link: '',
        slug: '',
        localization: {
          country: form.controls.addressCountry.value,
          state: form.controls.addressState.value,
          city: form.controls.addressCity.value,
          neighborhood: form.controls.addressNeighborhood.value,
          street: form.controls.addressStreet.value,
          number: form.controls.addressNumber.value,
          complement: form.controls.addressComplement.value,
          cep: form.controls.addressCep.value,
        },
        serviceArea: {
          country: form.controls.serviceAddressCountry.value,
          state: form.controls.serviceAddressState.value,
          city: form.controls.serviceAddressCity.value,
          cep: form.controls.serviceAddressCep.value,
        },
        images: [],
        socialNetworks: [],
        categories: this.filterCategories(form.controls.serviceCategory.value), //pega o objeto da categoria por seu nome
      };

      Generators.slug(professional);
      Generators.link(professional);

      console.log('professional ');
      console.log(professional);

      return professional;
    }

    return null;
  }

  public registerCompany(form: any): ICompany | null {
    if (this.companyAddressCountry.nativeElement.value) {
      form.controls.addressCountry.value =
        this.companyAddressCountry.nativeElement.value;
      form.controls.addressCountry.status = 'VALID';
      form.controls.addressCountry.errors = {};
      form.value.addressCountry = form.controls.addressCountry.value;
    }

    if (this.companyAddressState.nativeElement.value) {
      form.controls.addressState.value =
        this.companyAddressState.nativeElement.value;
      form.controls.addressState.status = 'VALID';
      form.controls.addressState.errors = {};
      form.value.addressState = form.controls.addressState.value;
    }

    if (this.companyAddressCity.nativeElement.value) {
      form.controls.addressCity.value =
        this.companyAddressCity.nativeElement.value;
      form.controls.addressCity.status = 'VALID';
      form.controls.addressCity.errors = {};
      form.value.addressCity = form.controls.addressCity.value;
    }

    if (this.companyServiceAddressCountry.nativeElement.value) {
      form.controls.serviceAddressCountry.value =
        this.companyServiceAddressCountry.nativeElement.value;
      form.controls.serviceAddressCountry.status = 'VALID';
      form.controls.serviceAddressCountry.errors = {};
      form.value.serviceAddressCountry =
        form.controls.serviceAddressCountry.value;
    }

    if (this.companyServiceAddressState.nativeElement.value) {
      form.controls.serviceAddressState.value =
        this.companyServiceAddressState.nativeElement.value;
      form.controls.serviceAddressState.status = 'VALID';
      form.controls.serviceAddressState.errors = {};
      form.value.serviceAddressState = form.controls.serviceAddressState.value;
    }

    if (this.companyServiceAddressCity.nativeElement.value) {
      form.controls.serviceAddressCity.value =
        this.companyServiceAddressCity.nativeElement.value;
      form.controls.serviceAddressCity.status = 'VALID';
      form.controls.serviceAddressCity.errors = {};
      form.value.serviceAddressCity = form.controls.serviceAddressCity.value;
    }

    if (this.companyServiceCategory.nativeElement.value) {
      form.controls.serviceCategory.value =
        this.companyServiceCategory.nativeElement.value;
      form.controls.serviceCategory.status = 'VALID';
      form.controls.serviceCategory.errors = {};
      form.value.serviceCategory = form.controls.serviceCategory.value;
    }

    this.companyFieldsValidator(form);

    if (form.valid === true) {
      let company: ICompany = {
        cnpj: form.controls.cnpj.value,
        serviceDescription: form.controls.serviceDescription.value,
        email: form.controls.email.value,
        emailConfirmation: form.controls.emailConfirmation.value,
        lastname: form.controls.lastname.value,
        name: form.controls.name.value,
        password: form.controls.password.value,
        passwordConfirmation: form.controls.passwordConfirmation.value,
        serviceType: form.controls.serviceType.value, //TODO: pegar valor de enum do formulário
        link: '',
        slug: '',
        localization: {
          country: form.controls.addressCountry.value,
          state: form.controls.addressState.value,
          city: form.controls.addressCity.value,
          neighborhood: form.controls.addressNeighborhood.value,
          street: form.controls.addressStreet.value,
          number: form.controls.addressNumber.value,
          complement: form.controls.addressComplement.value,
          cep: form.controls.addressCep.value,
        },
        serviceArea: {
          country: form.controls.serviceAddressCountry.value,
          state: form.controls.serviceAddressState.value,
          city: form.controls.serviceAddressCity.value,
          cep: form.controls.serviceAddressCep.value,
        },
        images: [],
        socialNetworks: [],
        categories: this.filterCategories(form.controls.serviceCategory.value),
      };

      Generators.slug(company);
      Generators.link(company);

      console.log('company ');
      console.log(company);

      return company;
    }

    return null;
  }

  trackByFn(item: any, index: any) {
    return TrackByFn.getItemId(item);
  }
}
