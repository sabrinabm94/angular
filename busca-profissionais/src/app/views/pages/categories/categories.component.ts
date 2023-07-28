import { Component } from '@angular/core';
import { ICategory } from 'src/app/utils/interfaces/ICategory.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  public category: ICategory = {
    id: '',
    name: '',
    description: '',
    link: '',
    slug: '',
    images: [
      {
        link: '',
        title: '',
      },
    ],
    professionals: [],
  };

  public componentParams: Array<ICategory> = [
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
            'Conheça profissionais de' + name + 'para atender o seu domicílio.',
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
  ];

  constructor() {}
}
