import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/utils/interfaces/Icategory.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  public pageParams: object = {};

  public category: ICategory = {
    name: '',
    description: '',
    link: '',
    images: [
      {
        link: '',
        title: '',
      },
    ],
  };

  public componentParams: Array<ICategory> = [
    {
      name: 'Assistência técnica',
      description:
        'Conheça profissionais de' +
        name +
        'para atender para encontrar e solucionar problemas.',
      link: '/assistencia-tecnica',
      images: [
        {
          link: '../../../assets/images/category/montagem-moveis.png',
          title: 'Assistência técnica',
        },
      ],
      subcategories: [
        {
          name: 'Montagem de imóveis',
          description:
            'Conheça profissionais de' +
            name +
            'para atender para encontrar e solucionar problemas.',
          link: '/montagem-de-moveis',
          images: [
            {
              link: '../../../assets/images/category/montagem-moveis.png',
              title: 'Montagem de imóveis',
            },
          ],
        },
        {
          name: 'Reparos residenciais',
          description:
            'Conheça profissionais de' +
            name +
            'para atender para encontrar e solucionar problemas.',
          link: '/reparos-residenciais',
          images: [
            {
              link: '../../../assets/images/category/reparos-residenciais.png',
              title: 'Reparos residenciais',
            },
          ],
        },
      ],
    },
    {
      name: 'Serviços de limpeza',
      description:
        'Conheça profissionais de' + name + 'para atender o seu domicílio.',
      link: '/servicos-de-limpeza',
      images: [
        {
          link: '../../../assets/images/category/servicos-limpeza.png',
          title: 'Serviços de limpeza',
        },
      ],
      subcategories: [
        {
          name: 'Limpeza residencial',
          description:
            'Conheça profissionais de' + name + 'para atender o seu domicílio.',
          link: '/limpeza-residencial',
          images: [
            {
              link: '../../../assets/images/category/montagem-moveis.png',
              title: 'Limpeza residencial',
            },
          ],
        },
      ],
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.pageParams = this.route.snapshot.params;
  }
}
