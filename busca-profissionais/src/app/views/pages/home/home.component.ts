import { Component } from '@angular/core';
import { IHome } from 'src/app/utils/interfaces/IHome.interface';
import TrackByFn from '../../../utils/trackByFn';
import { IProfessional } from '../../../utils/interfaces/IProfessional';
import ServiceTypeTransformation from '../../../utils/serviceTypeTransformation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public projectTitle: string = '';
  public projectDescription: string = '';
  private searchTerm: string = '';

  public componentParams: IHome = {
    images: [
      {
        link: '../../../assets/images/home/professional-search.png',
        title: 'Busque pelo profissional',
        width: 150,
        height: 150,
      },
      {
        link: '../../../assets/images/home/professional-get-in-contact.png',
        title: 'Entre em contato direto com o profissional',
        width: 150,
        height: 150,
      },
      {
        link: '../../../assets/images/home/professional-talk.png',
        title: 'Explique sua demanda',
        width: 150,
        height: 150,
      },
      {
        link: '',
        title: '',
        width: 150,
        height: 150,
      },
    ],
    bestCategories: [
      {
        id: '1',
        name: 'Assistência técnica',
        description:
          'Conheça profissionais de' +
          name +
          'para atender para encontrar e solucionar problemas.',
        link: '/assist-tecnica',
        slug: 'assist-tecnica',
        images: [
          {
            link: '../../../assets/images/category/montagem-moveis.png',
            title: 'Assistência técnica',
          },
        ],
        subcategories: [
          {
            id: '3',
            name: 'Montagem de imóveis',
            description:
              'Conheça profissionais de' +
              name +
              'para atender para encontrar e solucionar problemas.',
            link: '/montagem-moveis',
            slug: 'montagem-moveis',
            images: [
              {
                link: '../../../assets/images/category/montagem-moveis.png',
                title: 'Montagem de imóveis',
              },
            ],
          },
          {
            id: '2',
            name: 'Reparos residenciais',
            description:
              'Conheça profissionais de' +
              name +
              'para atender para encontrar e solucionar problemas.',
            link: '/reparos-residenciais',
            slug: 'reparos-residenciais',
            images: [
              {
                link: '../../../assets/images/category/reparos-residenciais.png',
                title: 'Reparos residenciais',
              },
            ],
          },
        ],
        professionals: [],
      },
      {
        id: '4',
        name: 'Serviços de limpeza',
        description:
          'Conheça profissionais de' + name + 'para atender o seu domicílio.',
        link: '/limpeza',
        slug: 'limpeza',
        images: [
          {
            link: '../../../assets/images/category/servicos-limpeza.png',
            title: 'Serviços de limpeza',
          },
        ],
        subcategories: [
          {
            id: '5',
            name: 'Limpeza residencial',
            description:
              'Conheça profissionais de' +
              name +
              'para atender o seu domicílio.',
            link: '/limpeza-residencial',
            slug: 'limpeza-residencial',
            images: [
              {
                link: '../../../assets/images/category/montagem-moveis.png',
                title: 'Limpeza residencial',
              },
            ],
          },
        ],
        professionals: [],
      },
    ],
  };

  public professional: Array<IProfessional> = [];

  public professionaisSearchResult: IProfessional[] = [
    {
      id: '1',
      name: 'Joana Maria',
      lastname: 'da Costa',
      link: '/joana-m-costa',
      slug: 'joana-m-costa',
      cpf: '',
      password: '',
      passwordConfirmation: '',
      localization: {
        country: "Brasil",
        state: 'São Paulo',
        city: 'São Paulo',
        neighborhood: 'Jardins',
        street: 'Rua São Paulo',
        number: 200,
        complement: 'residencial florida, apto 302',
        cep: 88390000,
      },
      serviceArea: {
        country: "Brasil",
        state: 'São Paulo',
        city: 'São Paulo',
        neighborhood: 'Jardins',
      },
      images: [
        {
          link: '../../../assets/images/category/montagem-moveis.png',
          title: 'Imagem do professional',
        },
      ],
      socialNetworks: [
        { name: 'phone', value: '47999501834' },
        { name: 'email', value: 'joanamariacosta@gmail.com' },
        {
          name: 'whatsapp',
          value:
            'https://wa.me/5547999501834?text=Oi,%20vim%20pelo%20Busca%20Profissionais',
        },
        { name: 'instagram', value: '' },
        { name: 'facebook', value: '' },
        { name: 'twitter', value: '' },
        { name: 'linkedin', value: '' },
        { name: 'site', value: '' },
      ],
      categories: [
        {
          id: '4',
          name: 'Serviços de limpeza',
          description:
            'Conheça profissionais de' + name + 'para atender o seu domicílio.',
          link: '/limpeza',
          slug: 'limpeza',

          images: [
            {
              link: '../../../assets/images/category/servicos-limpeza.png',
              title: 'Serviços de limpeza',
            },
          ],
          subcategories: [
            {
              id: '5',
              name: 'Limpeza residencial',
              description:
                'Conheça profissionais de' +
                name +
                'para atender o seu domicílio.',
              link: '/limpeza-residencial',
              slug: 'limpeza-residencial',
              images: [
                {
                  link: '../../../assets/images/category/montagem-moveis.png',
                  title: 'Limpeza residencial',
                },
              ],
            },
          ],
          professionals: [],
        },
      ],
      serviceDescription: 'Atuo a mais de 10 anos como diarista.',
      serviceType: [ServiceTypeTransformation.serviceTypeTransformation(1)],
      email: '',
      emailConfirmation: '',
    },
  ];

  ngOnInit() {
    this.projectTitle = 'Buscar profissionais';
    this.projectDescription = 'Buscar por prestadores de serviços';
  }

  public searchProfessional(event: any) {
    event.preventDefault();
    this.searchTerm = event.target[0].value;
    this.searchProfessionalByTerm(this.searchTerm);
    return console.log(this.searchTerm);
  }

  private searchProfessionalByTerm(term: string) {
    return console.log(term);
  }

  trackByFn(item: any, index: any) {
    return TrackByFn.getItemId(item);
  }
}
